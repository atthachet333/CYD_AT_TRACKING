const ALLOWED_SHEETS = [
  "CONFIG",
  "MASTER_CASE",
  "ADMIN_STATUS",
  "DOCUMENT_STATUS",
  "DAILY_WORK_LOG",
  "PROBLEM_LOG",
  "DASHBOARD_DATA",
  "ALL",
] as const;

export type SheetName = (typeof ALLOWED_SHEETS)[number];

export type SheetRow = Record<string, unknown>;

export interface SheetApiResponse {
  ok: boolean;
  sheet: SheetName;
  data: SheetRow[];
  error?: string;
  [key: string]: unknown;
}

const SHEET_CACHE_TTL_MS = 60_000;
const SHEET_FETCH_TIMEOUT_MS = 8_000;
const sheetCache = new Map<
  SheetName,
  {
    expiresAt: number;
    response: SheetApiResponse;
  }
>();
const pendingSheetRequests = new Map<SheetName, Promise<SheetApiResponse>>();

export class GoogleSheetsError extends Error {
  status: number;
  details?: Record<string, unknown>;

  constructor(message: string, status = 500, details?: Record<string, unknown>) {
    super(message);
    this.name = "GoogleSheetsError";
    this.status = status;
    this.details = details;
  }
}

export function isAllowedSheet(sheetName: string): sheetName is SheetName {
  return ALLOWED_SHEETS.includes(sheetName as SheetName);
}

export function getSheetRows(payload: unknown): SheetRow[] {
  if (Array.isArray(payload)) {
    return payload.filter(isSheetRow);
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const response = payload as Record<string, unknown>;
  const candidates = [response.data, response.rows, response.values];
  const rows = candidates.find(Array.isArray);

  return Array.isArray(rows) ? rows.filter(isSheetRow) : [];
}

export async function fetchSheet(sheetName: string): Promise<SheetApiResponse> {
  if (!isAllowedSheet(sheetName)) {
    throw new GoogleSheetsError("Sheet is not allowed", 400);
  }

  const startedAt = Date.now();
  const cached = sheetCache.get(sheetName);

  if (cached && cached.expiresAt > Date.now()) {
    logSheetTiming(sheetName, "cache=hit", startedAt, cached.response.data.length);
    return cached.response;
  }

  const pending = pendingSheetRequests.get(sheetName);
  if (pending) {
    try {
      const response = await pending;
      logSheetTiming(sheetName, "pending=join", startedAt, response.data.length);
      return response;
    } catch (error) {
      logSheetTiming(sheetName, "pending=join error", startedAt, undefined, error);
      throw error;
    }
  }

  const request = fetchSheetFromUpstream(sheetName, startedAt);
  pendingSheetRequests.set(sheetName, request);

  try {
    return await request;
  } finally {
    pendingSheetRequests.delete(sheetName);
  }
}

async function fetchSheetFromUpstream(sheetName: SheetName, startedAt: number): Promise<SheetApiResponse> {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  if (!webAppUrl) {
    const error = new GoogleSheetsError("GOOGLE_SHEETS_WEBAPP_URL is not configured", 500);
    logSheetTiming(sheetName, "error", startedAt, undefined, error);
    throw error;
  }

  let url: URL;

  try {
    url = new URL(webAppUrl);
  } catch {
    const error = new GoogleSheetsError("GOOGLE_SHEETS_WEBAPP_URL is invalid", 500);
    logSheetTiming(sheetName, "error", startedAt, undefined, error);
    throw error;
  }

  url.searchParams.set("sheet", sheetName);

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      cache: "no-store",
      redirect: "follow",
      signal: getTimeoutSignal(SHEET_FETCH_TIMEOUT_MS),
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    const googleSheetsError = new GoogleSheetsError("Failed to fetch Google Sheet data", 502);
    logSheetTiming(sheetName, "error", startedAt, undefined, error);
    throw googleSheetsError;
  }

  const upstreamContentType = response.headers.get("content-type") ?? "";
  let responseText: string;

  try {
    responseText = await response.text();
  } catch (error) {
    const googleSheetsError = new GoogleSheetsError("Failed to read Google Sheet response", 502, {
      upstreamStatus: response.status,
      upstreamContentType,
    });
    logSheetTiming(sheetName, "error", startedAt, undefined, error);
    throw googleSheetsError;
  }

  if (!response.ok) {
    const error = new GoogleSheetsError("Google Sheet service returned an error", 502, {
      upstreamStatus: response.status,
      upstreamContentType,
      upstreamPreview: previewText(responseText),
    });
    logSheetTiming(sheetName, "error", startedAt, undefined, error);
    throw error;
  }

  let payload: unknown;

  try {
    payload = JSON.parse(responseText);
  } catch (error) {
    const googleSheetsError = new GoogleSheetsError("Google Sheet service returned invalid JSON", 502, {
      upstreamStatus: response.status,
      upstreamContentType,
      upstreamPreview: previewText(responseText),
    });
    logSheetTiming(sheetName, "error", startedAt, undefined, error);
    throw googleSheetsError;
  }

  const baseResponse =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : {};

  const sheetResponse = {
    ...baseResponse,
    ok: baseResponse.ok === false ? false : true,
    sheet: sheetName,
    data: getSheetRows(payload),
  };

  sheetCache.set(sheetName, {
    expiresAt: Date.now() + SHEET_CACHE_TTL_MS,
    response: sheetResponse,
  });

  logSheetTiming(sheetName, "cache=miss", startedAt, sheetResponse.data.length);
  return sheetResponse;
}

function getTimeoutSignal(timeoutMs: number) {
  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
    return AbortSignal.timeout(timeoutMs);
  }

  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

function logSheetTiming(
  sheetName: SheetName,
  event: string,
  startedAt: number,
  rows?: number,
  error?: unknown
) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const parts = [`[sheets] sheet=${sheetName}`, event, `ms=${Date.now() - startedAt}`];
  if (typeof rows === "number") {
    parts.push(`rows=${rows}`);
  }
  if (error instanceof Error) {
    parts.push(`message=${error.message}`);
  }

  console.info(parts.join(" "));
}

function isSheetRow(value: unknown): value is SheetRow {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function previewText(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, 200);
}

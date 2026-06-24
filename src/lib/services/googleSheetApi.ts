import type { DashboardSummary, MasterCaseRow } from "../../types";

type ApiResponse<T> = {
  ok?: boolean;
  data?: T;
  error?: string;
};

const emptyDashboardSummary: DashboardSummary = {
  totalCases: 0,
  closedCases: 0,
  inProgressCases: 0,
  urgentCases: 0,
  missingDocumentCases: 0,
  nearDueCases: 0,
  overdueCases: 0,
};

export async function fetchSheet(sheetName: string): Promise<unknown> {
  const response = await fetch(`/api/sheets?sheet=${encodeURIComponent(sheetName)}`, {
    cache: "no-store",
  });

  return response.json();
}

export async function fetchMasterCases(): Promise<MasterCaseRow[]> {
  const response = await fetch("/api/jobs", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as ApiResponse<unknown>;
  return Array.isArray(payload.data) ? payload.data.filter(isMasterCaseRow) : [];
}

export async function fetchDashboardData(): Promise<DashboardSummary> {
  const response = await fetch("/api/dashboard", {
    cache: "no-store",
  });

  if (!response.ok) {
    return emptyDashboardSummary;
  }

  const payload = (await response.json()) as ApiResponse<unknown>;
  return normalizeDashboardSummary(payload.data);
}

export function normalizeDashboardSummary(value: unknown): DashboardSummary {
  if (Array.isArray(value)) {
    return normalizeDashboardMetricRows(value);
  }

  if (!value || typeof value !== "object") {
    return emptyDashboardSummary;
  }

  const row = value as Record<string, unknown>;

  return {
    totalCases: toNumber(row.totalCases ?? row.TOTAL_CASES),
    closedCases: toNumber(row.closedCases ?? row.CLOSED_CASES),
    inProgressCases: toNumber(row.inProgressCases ?? row.IN_PROGRESS_CASES),
    urgentCases: toNumber(row.urgentCases ?? row.URGENT_CASES),
    missingDocumentCases: toNumber(row.missingDocumentCases ?? row.MISSING_DOCUMENT_CASES),
    nearDueCases: toNumber(row.nearDueCases ?? row.NEAR_DUE_CASES),
    overdueCases: toNumber(row.overdueCases ?? row.OVERDUE_CASES),
  };
}

function normalizeDashboardMetricRows(rows: unknown[]): DashboardSummary {
  const summary = { ...emptyDashboardSummary };

  rows.forEach((row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      return;
    }

    const metric = row as Record<string, unknown>;
    const name = String(metric.METRIC_NAME ?? metric.metricName ?? "").trim();
    const value = toNumber(metric.METRIC_VALUE ?? metric.metricValue);

    if (name.includes("จำนวนเคสทั้งหมด")) {
      summary.totalCases = value;
    } else if (name.includes("เคสเสร็จสิ้น") || name.includes("งานที่ปิดแล้ว")) {
      summary.closedCases = value;
    } else if (name.includes("เคสกำลังดำเนินการ")) {
      summary.inProgressCases = value;
    } else if (name.includes("เคสเร่งด่วน")) {
      summary.urgentCases = value;
    } else if (name.includes("เอกสารขาด") || name.includes("เคสรอเอกสาร")) {
      summary.missingDocumentCases = Math.max(summary.missingDocumentCases, value);
    } else if (name.includes("ใกล้ครบกำหนด")) {
      summary.nearDueCases = value;
    } else if (name.includes("เกินกำหนด")) {
      summary.overdueCases = value;
    }
  });

  return summary;
}

function isMasterCaseRow(value: unknown): value is MasterCaseRow {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toNumber(value: unknown) {
  const numberValue = Number(value ?? 0);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

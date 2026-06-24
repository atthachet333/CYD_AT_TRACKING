import { fetchSheet, SheetRow } from "./googleSheets";

export type CaseRow = SheetRow & {
  CASE_ID?: string;
  DATE_CREATED?: string;
  CUSTOMER_NAME?: string;
  COMPANY_NAME?: string;
  WORK_TYPE?: string;
  PRIORITY?: string;
  OWNER_DEPT?: string;
  ASSIGNED_TO?: string;
  CASE_STATUS?: string;
  DOCUMENT_STATUS?: string;
  ADMIN_STATUS?: string;
  DUE_DATE?: string;
  NOTE?: string;
};

export async function getMasterCases() {
  const response = await fetchSheet("MASTER_CASE");
  return response.data as CaseRow[];
}

export async function getSheetData(sheetName: "CONFIG" | "PROBLEM_LOG" | "DASHBOARD_DATA") {
  const response = await fetchSheet(sheetName);
  return response.data;
}

export function parseDate(value: unknown) {
  if (!value) {
    return null;
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function daysBetween(from: Date, to: Date) {
  const diff = startOfDay(to).getTime() - startOfDay(from).getTime();
  return Math.ceil(diff / 86_400_000);
}

export function normalizeText(value: unknown) {
  return String(value ?? "").trim().toUpperCase();
}

export function displayValue(value: unknown, fallback = "-") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

export function isClosedCase(row: CaseRow) {
  const caseStatus = normalizeText(row.CASE_STATUS);
  const adminStatus = normalizeText(row.ADMIN_STATUS);

  return (
    caseStatus.includes("เสร็จ") ||
    caseStatus.includes("CLOSE") ||
    caseStatus.includes("COMPLETE") ||
    adminStatus.includes("อนุมัติแล้ว") ||
    adminStatus.includes("APPROVED")
  );
}

export function isNearDueCase(row: CaseRow, today = startOfDay(new Date())) {
  if (isClosedCase(row)) {
    return false;
  }

  const dueDate = parseDate(row.DUE_DATE);
  if (!dueDate) {
    return false;
  }

  const remainingDays = daysBetween(today, dueDate);
  return remainingDays >= 0 && remainingDays <= 7;
}

export function isOverdueCase(row: CaseRow, today = startOfDay(new Date())) {
  if (isClosedCase(row)) {
    return false;
  }

  const dueDate = parseDate(row.DUE_DATE);
  return !!dueDate && dueDate < today;
}

export function groupByField(rows: CaseRow[], field: keyof CaseRow) {
  const grouped = new Map<string, CaseRow[]>();

  rows.forEach((row) => {
    const key = displayValue(row[field], "ไม่ระบุ");
    grouped.set(key, [...(grouped.get(key) ?? []), row]);
  });

  return Array.from(grouped.entries()).map(([name, items]) => ({ name, items, count: items.length }));
}

export function deriveCustomers(rows: CaseRow[]) {
  const grouped = new Map<string, CaseRow[]>();

  rows.forEach((row) => {
    const customerName = displayValue(row.CUSTOMER_NAME, "ไม่ระบุลูกค้า");
    const companyName = displayValue(row.COMPANY_NAME, "ไม่ระบุบริษัท");
    const key = `${customerName}|${companyName}`;
    grouped.set(key, [...(grouped.get(key) ?? []), row]);
  });

  return Array.from(grouped.entries()).map(([key, items]) => {
    const [customerName, companyName] = key.split("|");
    return {
      customerName,
      companyName,
      activeCases: items.filter((item) => !isClosedCase(item)).length,
      totalCases: items.length,
      status: items.some((item) => !isClosedCase(item)) ? "Active" : "Closed",
    };
  });
}

export function deriveServices(rows: CaseRow[]) {
  return groupByField(rows, "WORK_TYPE").map((group, index) => ({
    serviceCode: `SVC-${String(index + 1).padStart(3, "0")}`,
    serviceName: group.name,
    sla: "-",
    departments: Array.from(new Set(group.items.map((item) => displayValue(item.OWNER_DEPT, "ไม่ระบุ")))).join(", "),
    status: group.count > 0 ? "เปิดใช้งาน" : "ปิดใช้งาน",
    caseCount: group.count,
  }));
}

export function deriveStaff(rows: CaseRow[]) {
  return groupByField(rows, "ASSIGNED_TO").map((group) => ({
    name: group.name,
    department: mostCommon(group.items.map((item) => displayValue(item.OWNER_DEPT, "ไม่ระบุ"))),
    position: "ผู้รับผิดชอบเคส",
    activeCases: group.items.filter((item) => !isClosedCase(item)).length,
    status: "Active",
    role: "User",
  }));
}

export function deriveDepartments(rows: CaseRow[]) {
  return groupByField(rows, "OWNER_DEPT").map((group) => ({
    name: group.name,
    lead: "-",
    memberCount: new Set(group.items.map((item) => displayValue(item.ASSIGNED_TO, "ไม่ระบุ"))).size,
    averageLoad: group.count,
    slaScope: Array.from(new Set(group.items.map((item) => displayValue(item.WORK_TYPE, "ไม่ระบุ")))).join(", "),
    caseCount: group.count,
  }));
}

export function deriveIssues(problemRows: SheetRow[], cases: CaseRow[]) {
  if (problemRows.length > 0) {
    return problemRows.map((row, index) => ({
      caseId: displayValue(row.CASE_ID ?? row.caseId, `ISSUE-${index + 1}`),
      customer: displayValue(row.CUSTOMER_NAME ?? row.customer),
      issue: displayValue(row.ISSUE ?? row.PROBLEM ?? row.NOTE, "ปัญหาที่ต้องติดตาม"),
      reportedAt: displayValue(row.DATE_CREATED ?? row.CREATED_AT ?? row.DATE),
      assignee: displayValue(row.ASSIGNED_TO ?? row.OWNER),
      severity: displayValue(row.PRIORITY ?? row.SEVERITY, "Medium"),
      status: displayValue(row.STATUS, "Open"),
    }));
  }

  return cases.filter(isIssueCase).map((row) => ({
    caseId: displayValue(row.CASE_ID),
    customer: displayValue(row.CUSTOMER_NAME || row.COMPANY_NAME),
    issue: displayValue(row.NOTE, buildIssueReason(row)),
    reportedAt: displayValue(row.DATE_CREATED),
    assignee: displayValue(row.ASSIGNED_TO),
    severity: normalizeText(row.PRIORITY).includes("HIGH") ? "High" : "Medium",
    status: displayValue(row.CASE_STATUS),
  }));
}

export function deriveReports(rows: CaseRow[], dashboardRows: SheetRow[]) {
  return {
    summary: calculateSummary(rows),
    dashboardRows,
    departments: deriveDepartments(rows),
    services: deriveServices(rows),
  };
}

export function calculateSummary(rows: CaseRow[]) {
  return {
    totalCases: rows.length,
    closedCases: rows.filter(isClosedCase).length,
    inProgressCases: rows.filter((row) => !isClosedCase(row)).length,
    urgentCases: rows.filter((row) => normalizeText(row.PRIORITY).includes("HIGH")).length,
    missingDocumentCases: rows.filter((row) => {
      const status = normalizeText(row.DOCUMENT_STATUS);
      return status.includes("ขาด") || status.includes("รอ") || status.includes("MISSING");
    }).length,
    nearDueCases: rows.filter((row) => isNearDueCase(row)).length,
    overdueCases: rows.filter((row) => isOverdueCase(row)).length,
  };
}

function isIssueCase(row: CaseRow) {
  const documentStatus = normalizeText(row.DOCUMENT_STATUS);
  const adminStatus = normalizeText(row.ADMIN_STATUS);
  const priority = normalizeText(row.PRIORITY);

  return (
    documentStatus.includes("ขาด") ||
    documentStatus.includes("รอเอกสาร") ||
    adminStatus.includes("รอข้อมูลลูกค้า") ||
    priority.includes("HIGH")
  );
}

function buildIssueReason(row: CaseRow) {
  const documentStatus = displayValue(row.DOCUMENT_STATUS, "");
  const adminStatus = displayValue(row.ADMIN_STATUS, "");
  const priority = displayValue(row.PRIORITY, "");
  return [documentStatus, adminStatus, priority].filter(Boolean).join(" / ") || "ปัญหาที่ต้องติดตาม";
}

function mostCommon(values: string[]) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
}

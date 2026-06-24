export type Role = "admin" | "user";

export interface User {
  username: string;
  role: Role;
  name: string;
}

export interface JobData {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "near_due" | "overdue" | "completed";
  assignee: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface Task extends JobData {
  description?: string;
}

export interface MasterCaseRow {
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
}

export interface DashboardSummary {
  totalCases: number;
  closedCases: number;
  inProgressCases: number;
  urgentCases: number;
  missingDocumentCases: number;
  nearDueCases: number;
  overdueCases: number;
}

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
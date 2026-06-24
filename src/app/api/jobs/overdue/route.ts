import { NextResponse } from "next/server";
import { daysBetween, displayValue, getMasterCases, isOverdueCase, parseDate, startOfDay } from "../../../../lib/server/jobDerive";

export async function GET() {
  try {
    const today = startOfDay(new Date());
    const rows = (await getMasterCases()).filter((row) => isOverdueCase(row, today));

    return NextResponse.json({
      ok: true,
      data: rows.map((row) => {
        const dueDate = parseDate(row.DUE_DATE);
        const overdueDays = dueDate ? Math.abs(daysBetween(today, dueDate)) : 0;
        return {
          caseId: displayValue(row.CASE_ID),
          customer: displayValue(row.CUSTOMER_NAME || row.COMPANY_NAME),
          workType: displayValue(row.WORK_TYPE),
          dueDate: displayValue(row.DUE_DATE),
          overdueDays,
          reason: displayValue(row.NOTE, displayValue(row.DOCUMENT_STATUS, "เกินกำหนด")),
          assignee: displayValue(row.ASSIGNED_TO),
          risk: overdueDays > 7 || displayValue(row.PRIORITY).toUpperCase() === "HIGH" ? "High" : "Medium",
          department: displayValue(row.OWNER_DEPT),
        };
      }),
    });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load overdue jobs" }, { status: 500 });
  }
}

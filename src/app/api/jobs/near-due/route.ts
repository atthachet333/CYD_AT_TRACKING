import { NextResponse } from "next/server";
import { daysBetween, displayValue, getMasterCases, isNearDueCase, parseDate, startOfDay } from "../../../../lib/server/jobDerive";

export async function GET() {
  try {
    const today = startOfDay(new Date());
    const rows = (await getMasterCases()).filter((row) => isNearDueCase(row, today));

    return NextResponse.json({
      ok: true,
      data: rows.map((row) => {
        const dueDate = parseDate(row.DUE_DATE);
        return {
          caseId: displayValue(row.CASE_ID),
          customer: displayValue(row.CUSTOMER_NAME || row.COMPANY_NAME),
          workType: displayValue(row.WORK_TYPE),
          dueDate: displayValue(row.DUE_DATE),
          remainingDays: dueDate ? daysBetween(today, dueDate) : null,
          department: displayValue(row.OWNER_DEPT),
          assignee: displayValue(row.ASSIGNED_TO),
          status: displayValue(row.CASE_STATUS),
          priority: displayValue(row.PRIORITY),
        };
      }),
    });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load near-due jobs" }, { status: 500 });
  }
}

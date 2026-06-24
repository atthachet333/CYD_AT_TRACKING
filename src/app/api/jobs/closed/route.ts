import { NextResponse } from "next/server";
import { daysBetween, displayValue, getMasterCases, isClosedCase, parseDate } from "../../../../lib/server/jobDerive";

export async function GET() {
  try {
    const rows = (await getMasterCases()).filter(isClosedCase);

    return NextResponse.json({
      ok: true,
      data: rows.map((row) => {
        const startDate = parseDate(row.DATE_CREATED);
        const dueDate = parseDate(row.DUE_DATE);
        return {
          caseId: displayValue(row.CASE_ID),
          customer: displayValue(row.CUSTOMER_NAME || row.COMPANY_NAME),
          workType: displayValue(row.WORK_TYPE),
          dateCreated: displayValue(row.DATE_CREATED),
          closedDate: displayValue(row.DUE_DATE),
          durationDays: startDate && dueDate ? Math.max(daysBetween(startDate, dueDate), 0) : null,
          closedBy: displayValue(row.ASSIGNED_TO),
          result: displayValue(row.ADMIN_STATUS, displayValue(row.CASE_STATUS)),
          summaryDocument: displayValue(row.NOTE, "-"),
        };
      }),
    });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load closed jobs" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { deriveReports, getMasterCases, getSheetData } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    const [cases, dashboardRows] = await Promise.all([
      getMasterCases(),
      getSheetData("DASHBOARD_DATA").catch(() => []),
    ]);
    return NextResponse.json({ ok: true, data: deriveReports(cases, dashboardRows) });
  } catch {
    return NextResponse.json({ ok: false, data: null, error: "Failed to load reports" }, { status: 500 });
  }
}

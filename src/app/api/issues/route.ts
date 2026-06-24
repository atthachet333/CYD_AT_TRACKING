import { NextResponse } from "next/server";
import { deriveIssues, getMasterCases, getSheetData } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    const [problemRows, cases] = await Promise.all([
      getSheetData("PROBLEM_LOG").catch(() => []),
      getMasterCases(),
    ]);
    return NextResponse.json({ ok: true, data: deriveIssues(problemRows, cases) });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load issues" }, { status: 500 });
  }
}

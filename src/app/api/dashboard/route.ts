import { NextResponse } from "next/server";
import {
  fetchSheet,
  GoogleSheetsError,
} from "../../../lib/server/googleSheets";
import { calculateSummary } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    const dashboardData = await fetchSheet("DASHBOARD_DATA");

    if (dashboardData.data.length > 0) {
      return NextResponse.json({
        ok: true,
        source: "DASHBOARD_DATA",
        data: dashboardData.data,
      });
    }
  } catch {
    // Fall through to MASTER_CASE so the dashboard can still render.
  }

  try {
    const masterCases = await fetchSheet("MASTER_CASE");

    return NextResponse.json({
      ok: true,
      source: "MASTER_CASE",
      data: calculateSummary(masterCases.data),
    });
  } catch (error) {
    if (error instanceof GoogleSheetsError) {
      return NextResponse.json(
        {
          ok: false,
          source: "fallback",
          data: createEmptyDashboardSummary(),
          error: error.message,
          ...error.details,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        source: "fallback",
        data: createEmptyDashboardSummary(),
        error: "Unexpected dashboard API error",
      },
      { status: 500 }
    );
  }
}

function createEmptyDashboardSummary() {
  return calculateSummary([]);
}

import { NextResponse } from "next/server";
import { fetchSheet, GoogleSheetsError } from "../../../lib/server/googleSheets";

export async function GET() {
  try {
    const masterCases = await fetchSheet("MASTER_CASE");
    return NextResponse.json({
      ok: true,
      data: masterCases.data,
    });
  } catch (error) {
    if (error instanceof GoogleSheetsError) {
      return NextResponse.json(
        { ok: false, data: [], error: error.message, ...error.details },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { ok: false, data: [], error: "Unexpected jobs API error" },
      { status: 500 }
    );
  }
}

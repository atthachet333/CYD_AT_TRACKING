import { NextResponse } from "next/server";
import { fetchSheet, GoogleSheetsError } from "../../../lib/server/googleSheets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get("sheet");

  if (!sheet) {
    return NextResponse.json(
      { ok: false, error: "Missing sheet query parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchSheet(sheet);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof GoogleSheetsError) {
      return NextResponse.json(
        { ok: false, error: error.message, ...error.details },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Unexpected Google Sheet API error" },
      { status: 500 }
    );
  }
}

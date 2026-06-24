import { NextResponse } from "next/server";
import { getSheetData } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, data: await getSheetData("CONFIG") });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load settings" }, { status: 500 });
  }
}

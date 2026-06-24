import { NextResponse } from "next/server";
import { deriveStaff, getMasterCases } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, data: deriveStaff(await getMasterCases()) });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load staff" }, { status: 500 });
  }
}

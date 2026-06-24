import { NextResponse } from "next/server";
import { deriveDepartments, getMasterCases } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, data: deriveDepartments(await getMasterCases()) });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load departments" }, { status: 500 });
  }
}

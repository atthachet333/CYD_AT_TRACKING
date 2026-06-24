import { NextResponse } from "next/server";
import { deriveCustomers, getMasterCases } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, data: deriveCustomers(await getMasterCases()) });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load customers" }, { status: 500 });
  }
}

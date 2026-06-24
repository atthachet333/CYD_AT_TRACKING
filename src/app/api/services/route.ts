import { NextResponse } from "next/server";
import { deriveServices, getMasterCases } from "../../../lib/server/jobDerive";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, data: deriveServices(await getMasterCases()) });
  } catch {
    return NextResponse.json({ ok: false, data: [], error: "Failed to load services" }, { status: 500 });
  }
}

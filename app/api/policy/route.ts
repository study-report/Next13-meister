import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const policyData = fs.readFileSync("public/no-edit/policy.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(policyData);

  return NextResponse.json({ data });
}

import { sanityClient } from "@/server/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  const workflows = await sanityClient.fetch(
    `*[_type == "workflow"]{title, workflowId}`
  );
  return NextResponse.json(workflows);
}

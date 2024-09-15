// /app/api/currentprofile/route.ts
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile"; // Ensure this path is correct

export async function GET() {
  try {
    const profile = await currentProfile();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// app/api/currentuseremail/route.ts

import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    // Fetch the current profile
    const profile = await currentProfile();

    // Return the email if available
    return NextResponse.json({ email: profile?.email || null });
  } catch (error) {
    console.error("Error fetching user email:", error);
    return NextResponse.json(
      { error: "Could not fetch user email" },
      { status: 500 }
    );
  }
}

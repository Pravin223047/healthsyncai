import { utapi } from "@/server/uploadthing";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const imageUrl = url.searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json({ message: "No URL provided" }, { status: 400 });
    }

    // Extract the image key from the URL
    const imageKey = getImageKeyFromUrl(imageUrl);
    if (!imageKey) {
      return NextResponse.json(
        { message: "Image key not found" },
        { status: 400 }
      );
    }

    // Delete the image using the key
    await utapi.deleteFiles(imageKey);

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

// Utility function to map URL to image key
const getImageKeyFromUrl = (url: string) => {
  // Implement this based on how you manage file keys and URLs
  // For example, you might use a mapping or parsing strategy
  return url.split("/").pop() || null;
};

// imageRemove.js

"use server";
import { utapi } from "../../server/uploadthing";

// Mock function to demonstrate image key extraction
// Replace this with your actual implementation
const getImageKeyFromUrl = (url) => {
  // Example logic to extract the key from URL
  const segments = url.split("/");
  return segments[segments.length - 1]; // Assuming the key is the last segment
};

export const imageRemove = async (imageUrl) => {
  try {
    const imageKey = getImageKeyFromUrl(imageUrl);
    if (!imageKey) {
      throw new Error("Image key not found for the given URL");
    }

    // Delete the image using the key
    const response = await utapi.deleteFiles(imageKey);

    if (response.error) {
      throw new Error(`Error deleting file: ${response.error.message}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false };
  }
};

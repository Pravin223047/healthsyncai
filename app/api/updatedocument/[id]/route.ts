// /app/api/updatedocument/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the path as needed
import { connectToDatabase } from "@/app/helpers/server-helper";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Missing or invalid ID parameter" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const document = await db.document.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Missing or invalid ID parameter" },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const { name, type, description, url } = await request.json();

    if (!name || !type || !description || !url) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the document in the database
    const updatedDocument = await db.document.update({
      where: { id },
      data: { name, type, description, url },
    });

    if (!updatedDocument) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDocument, { status: 200 });
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
};

import { connectToDatabase } from "@/app/helpers/server-helper";
import { db } from "@/lib/db"; // Ensure this imports the Prisma client correctly
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { profileId, name, type, date, description, url } = await req.json();

    // Validation check
    if (!profileId || !name || !type || !date || !description || !url) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    // Create document record
    const document = await db.document.create({
      data: {
        profileId,
        name,
        type,
        date,
        description,
        url,
      },
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/document:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectToDatabase();

    // Fetch all documents records
    const documents = await db.document.findMany();

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id, profileId } = await req.json();

    // Validation check
    if (!id || !profileId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    // Delete the document from the database
    const deletedDocument = await db.document.delete({
      where: {
        id,
      },
    });

    if (!deletedDocument) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Document deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/document:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

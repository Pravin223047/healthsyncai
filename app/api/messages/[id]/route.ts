import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher"; // Import Pusher

type ReactionMap = { [emoji: string]: string[] };

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { emoji, userEmail } = await req.json();

  if (!emoji || !userEmail) {
    return NextResponse.json(
      { error: "Emoji and userEmail are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the message
    const message = await db.message.findUnique({
      where: { id },
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Parse reactions and initialize if null
    const reactions: ReactionMap = message.reactions
      ? JSON.parse(message.reactions as string)
      : {};

    // Remove previous reactions by the user for all emojis
    Object.keys(reactions).forEach((key) => {
      reactions[key] = reactions[key].filter((user) => user !== userEmail);
      if (reactions[key].length === 0) {
        delete reactions[key]; // Remove empty emoji arrays
      }
    });

    // Add the new reaction (prevent duplicate emoji reaction)
    if (!reactions[emoji]) {
      reactions[emoji] = [];
    }
    if (!reactions[emoji].includes(userEmail)) {
      reactions[emoji].push(userEmail);
    }

    // Update the message with new reactions
    await db.message.update({
      where: { id },
      data: { reactions: JSON.stringify(reactions) },
    });

    // Trigger Pusher event for real-time updates
    await pusherServer.trigger(`message-${id}`, "reaction:update", {
      messageId: id,
      reactions,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating reactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch the message and its reactions
    const message = await db.message.findUnique({
      where: { id },
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    const reactions = message.reactions
      ? JSON.parse(message.reactions as string)
      : {};

    return NextResponse.json({ reactions });
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { emoji, userEmail } = await req.json();

  if (!emoji || !userEmail) {
    return NextResponse.json(
      { error: "Emoji and userEmail are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the message
    const message = await db.message.findUnique({
      where: { id },
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    const reactions: ReactionMap = message.reactions
      ? JSON.parse(message.reactions as string)
      : {};

    // Remove the reaction by the user for the specific emoji
    if (reactions[emoji]) {
      reactions[emoji] = reactions[emoji].filter((user) => user !== userEmail);
      if (reactions[emoji].length === 0) {
        delete reactions[emoji]; // Remove empty emoji arrays
      }
    }

    // Update the message with updated reactions
    await db.message.update({
      where: { id },
      data: { reactions: JSON.stringify(reactions) },
    });

    // Trigger Pusher event for real-time updates
    await pusherServer.trigger(`message-${id}`, "reaction:update", {
      messageId: id,
      reactions,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing reaction:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

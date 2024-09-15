import { NextApiRequest, NextApiResponse } from "next";
import { pusherServer } from "@/lib/pusher";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the current user's authentication details
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch user profile from your database (if necessary)
    // For example, assuming `db` is your database client
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { socket_id, channel_name } = req.body;

    if (!socket_id || !channel_name) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const data = {
      user_id: profile.email, // Or use userId if that's more appropriate
    };

    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      data
    );

    return res.json(authResponse);
  } catch (error) {
    console.error("Error in Pusher auth handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

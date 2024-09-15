import { Conversation, Message, Profile } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server, Member, CommunityProfile } from "@prisma/client";

export type FullMessageType = Message & {
  sender: Profile;
  seen: Profile[];
};

export type FullConversationType = Conversation & {
  users: Profile[];
  messages: FullMessageType[];
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: CommunityProfile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

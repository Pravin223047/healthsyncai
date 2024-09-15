import { initialProfile } from "@/lib/community/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { InitialModal } from "../components/Modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/community/servers/${server.id}`);
  }
  return <InitialModal />;
};

export default SetupPage;

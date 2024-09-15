"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../components/Modals/create-server-modal";
import { InviteModal } from "../components/Modals/invite-modal";
import { DeleteChannelModal } from "../components/Modals/delete-channel-modal";
import { EditServerModal } from "../components/Modals/edit-server-modal";
import { MembersModal } from "../components/Modals/members-modal";
import { CreateChannelModal } from "../components/Modals/create-channel-modal";
import { LeaveServerModal } from "../components/Modals/leave-server-modal";
import { DeleteServerModal } from "../components/Modals/delete-server-modal";
import { EditChannelModal } from "../components/Modals/edit-channel-modal";
import { MessageFileModal } from "../components/Modals/message-file-modal";
import { DeleteMessageModal } from "../components/Modals/delete-message-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};

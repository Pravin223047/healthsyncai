import { Profile } from "@prisma/client";
import { FullConversationType } from "../types";
import { useEffect, useState } from "react";

const useOtherUser = (
  conversation: FullConversationType | { users: Profile[] }
) => {
  const [otherUser, setOtherUser] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/currentprofile");
        const profile = await response.json();

        if (!profile?.email) throw new Error("Current user's email not found");

        const filteredUsers = conversation.users.filter(
          (user) => user.email !== profile.email
        );
        if (filteredUsers.length > 0) {
          setOtherUser(filteredUsers[0]); // Assuming one other user is relevant
        }
      } catch (error) {
        console.error("Failed to fetch and filter users:", error);
      }
    };

    fetchProfile();
  }, [conversation]);

  return otherUser;
};

export default useOtherUser;

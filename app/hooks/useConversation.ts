import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  // Extract URL parameters
  const params = useParams();

  // Memoize conversationId to ensure it's a single string
  const conversationId = useMemo(() => {
    if (typeof params?.conversationId === "string") {
      return params.conversationId; // Ensure it's a string
    }
    return ""; // Default to an empty string if not present or not a string
  }, [params?.conversationId]);

  // Determine if the conversation is open based on conversationId presence
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  // Memoize the object to avoid unnecessary re-renders
  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;

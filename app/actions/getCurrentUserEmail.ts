import React, { useEffect, useState } from "react";

const UserEmailFetcher: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await fetch("/api/currentuseremail");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setEmail(data.email); // Ensure this is a string or null
      } catch (error) {
        console.error("Failed to fetch email:", error);
      }
    };

    fetchEmail();
  }, []);

  return email; // Ensure you handle the case where `email` could be null
};

export default UserEmailFetcher;

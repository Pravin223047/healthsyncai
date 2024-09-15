import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const getUsers = async () => {
  try {
    // Fetch the current profile
    const currentProfileData = await currentProfile();

    // Extract the email to exclude, if available
    const excludeEmail = currentProfileData?.email;

    // Fetch users from the database, excluding the current user's email
    const users = await db.profile.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: excludeEmail
        ? {
            NOT: {
              email: excludeEmail,
            },
          }
        : {}, // If there's no email to exclude, don't add a where condition
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
};

export default getUsers;

import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  // Fetch the current user
  const user = await currentUser();

  // Redirect to sign-in if no user is found
  if (!user) {
    return auth().redirectToSignIn();
  }

  // Try to find the user's profile in the database
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  // Return the existing profile if found
  if (profile) {
    return profile;
  }

  // Create a new profile if not found
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email:
        user.emailAddresses.length > 0
          ? user.emailAddresses[0].emailAddress
          : "",
    },
  });

  return newProfile;
};

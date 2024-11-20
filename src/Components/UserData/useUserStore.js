import { create } from "zustand";
import Parse from "parse";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: false,
  setIsLoadingTrue: () => set({ isLoading: true }),
  fetchUserInfo: async (uid) => {
    if (!uid)
      return (
        set({ currentUser: null, isLoading: false }), console.log("Logged out")
      );

    try {
      // Retrieve Current User
      const user = await Parse.User.current();

      // Save Full Name
      const fullName = user.get("fullName");
      console.log("Fetching info on user:", user.get("fullName"));

      // Saving role for later use
      const role = user.get("role");

      // Fetch user data from the user_profile table
      const UserProfile = Parse.Object.extend("user_profile");
      const query = new Parse.Query(UserProfile);
      query.equalTo("user", user);
      const userProfile = await query.first();

      // Get UserId from user_profile
      const userId = userProfile.id;
      console.log("User ID is:", userId);

      // Get ProfilePicURL from user_profile
      const profilePicUrl = userProfile.get("profile_pic").url();
      console.log("Profile picture URL:", profilePicUrl);

      // Get ChatId from user_profile
      const chatId = userProfile.get("chat").id;
      console.log("Chat ID is:", chatId);

      // Fetch other users associated with the same chat
      const chatQuery = new Parse.Query(UserProfile);
      chatQuery.equalTo("chat", userProfile.get("chat"));
      const otherUsers = await chatQuery.find();

      // Fetch first names from the user_profile table and filter out the current user's first name
      const currentUserFirstName = userProfile.get("firstName");
      const otherUserFirstNames = otherUsers
        .map((profile) => profile.get("firstName"))
        .filter((firstName) => firstName !== currentUserFirstName);

      console.log("Other users in the chat:", otherUserFirstNames);

      set({
        currentUser: {
          userId,
          role,
          fullName,
          profilePicUrl,
          chatId,
          otherUserFirstNames,
        },
        isLoading: false,
      });
    } catch (error) {
      console.log("Error!: can't fetch user info");
      set({ currentUser: null, isLoading: false });
    }
  },
}));

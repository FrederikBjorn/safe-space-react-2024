import { create } from "zustand";
import Parse from "parse";

// Custom hook that handles global user-related state (loading status, user info)
export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: false,
  setIsLoadingTrue: () => set({ isLoading: true }),
  fetchUserInfo: async (uid) => {
    set({ isLoading: true });
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      // Retrieve Current User
      const user = await Parse.User.current();

      // Save Full Name
      const fullName = user.get("fullName");

      // Saving role for later use
      const role = user.get("role");

      // Fetch user data from the user_profile table and include related fields
      const query = new Parse.Query("user_profile");
      query.equalTo("user", user);
      query.select("profile_pic", "chat");
      // query.include("profile_pic");
      // query.include("chat");
      const userProfile = await query.first();

      // Get UserId from user_profile
      const userId = userProfile.id;

      // Get ProfilePicURL from user_profile
      const profilePicUrl = userProfile.get("profile_pic").url();

      // Get ChatId from user_profile
      const chatId = userProfile.get("chat").id;

      // Fetch other users associated with the same chat
      const chatQuery = new Parse.Query("user_profile");
      chatQuery.equalTo("chat", userProfile.get("chat"));
      const otherUsers = await chatQuery.find();

      // Fetch first names from the user_profile table and filter out the current user's first name
      const currentUserFirstName = userProfile.get("firstName");
      const otherUserFirstNames = otherUsers
        .map((profile) => profile.get("firstName"))
        .filter((firstName) => firstName !== currentUserFirstName);

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
      set({ currentUser: null, isLoading: false });
    }
  },
}));

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
      //Retrieve Current User
      const user = await Parse.User.current();

      //Save Fill Name
      const fullName = user.get("fullName");
      console.log("Fething info on user:", user.get("fullName"));

      //Fetch user data from the user_profile table
      const UserProfile = await Parse.Object.extend("user_profile");
      const query = new Parse.Query(UserProfile);
      query.equalTo("user", user);
      const userProfile = await query.first();

      //Get ChatId from user_profile
      const userId = await userProfile.id;
      console.log("User ID is :", userId);

      //Get ProfilePicURL from user_profile
      const profilePicUrl = await userProfile.get("profile_pic").url();
      console.log("Profile picture URL:", profilePicUrl);

      //Get ChatId from user_profile
      const chatId = await userProfile.get("chat").id;
      console.log("Chat ID is :", chatId);

      set({
        currentUser: { userId, fullName, profilePicUrl, chatId },
        isLoading: false,
      });
    } catch (error) {
      console.log("Error!: can't fetch user info");
      set({ currentUser: null, isLoading: false });
    }
  },
}));

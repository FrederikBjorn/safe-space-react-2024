import Parse from "parse";
import { simpleErrorToast, simpleSuccessToast } from "../Utils/toastUtils";


function useUserSignUp() {
  const userSignUp = async (user) => {
    try {
      const currentUser = Parse.User.current();
      const currentSessionToken = currentUser.getSessionToken();

      // Setting up new user!!
      const newUser = new Parse.User();
      newUser.set("username", user.userName);
      newUser.set("password", user.password);
      newUser.set("email", user.email);
      newUser.set("fullName", user.fullName);
      newUser.set("role", user.role);

      await newUser.signUp();
      simpleSuccessToast("The user " + user.userName + " was sucsesfully added.")
      // Ensuring that the current user is still Thanos and not new user!!
      await Parse.User.become(currentSessionToken);

      // Adding new user to chat ACL!
      const chatQuery = new Parse.Query("chat");
      const chat = await chatQuery.get(user.chatId);
      const chatAcl = (await chat.getACL()) || new Parse.ACL();

      chatAcl.setReadAccess(newUser, true);
      chatAcl.setWriteAccess(newUser, true);
      chat.setACL(chatAcl);

      // Creating user profile with first name and profile picture!
      const userProfile = new Parse.Object("user_profile");
      userProfile.set("user", newUser.toPointer());
      userProfile.set("firstName", user.fullName.split(" ")[0]);

      userProfile.set("chat", chat);

      if (user.profilePic) {
        const parseFile = new Parse.File(user.profilePic.name, user.profilePic);
        await parseFile.save();
        userProfile.set("profile_pic", parseFile);
      } else {
        console.log("No profile pic found.");
      }

      await userProfile.save();
      console.log("User profile saved successfully.");
    } catch (error) {
      simpleErrorToast(`User creation unsuccessful - ${error.message}`);
      console.error("Error details for unsucsessful signup:", error);
    }
  };
  return { userSignUp };
}

export default useUserSignUp;

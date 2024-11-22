import Parse from "parse";
import { useUserStore } from "../../UserData/useUserStore";

const useUpdateChatMessages = () => {
  const { currentUser } = useUserStore();

  const updateMessages = async (messageText) => {
    try {
      let message = new Parse.Object("message");
      message.set("text", messageText);

      // I am creating a pointer to user_profile
      const userProfile = new Parse.Object("user_profile");
      userProfile.id = currentUser.userId;
      message.set("sender_user", userProfile);

      // I am creating a pointer to specific chat
      const userChat = new Parse.Object("chat");
      userChat.id = currentUser.chatId;
      message.set("chat", userChat);

      const newMessage = await message.save();

      console.log("New Message Added with text :", newMessage.get("text"));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return { updateMessages };
};

export default useUpdateChatMessages;

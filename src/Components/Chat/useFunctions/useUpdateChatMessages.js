import { useCallback } from "react";
import Parse from "parse";
import { useUserStore } from "../../UserData/useUserStore";

const useUpdateChatMessages = () => {
  const { currentUser } = useUserStore();

  const updateMessages = useCallback(
    async (messageText) => {
      const Chat = Parse.Object.extend("chat");
      const Message = Parse.Object.extend("message");
      const UserProfile = Parse.Object.extend("user_profile");
      const chatQuery = new Parse.Query(Chat);

      try {
        const chat = await chatQuery.get(currentUser.chatId);
        console.log("Retrieved chat:", chat);

        const message = new Message();
        message.set("text", messageText);

        const userProfilePointer = new UserProfile();
        userProfilePointer.id = currentUser.userId;
        message.set("sender_user", userProfilePointer);

        const savedMessage = await message.save();

        const currentMessages = chat.get("messages") || [];

        const updatedMessages = currentMessages.concat(savedMessage);

        chat.set("messages", updatedMessages);

        const updatedChat = await chat.save();
        console.log("Updated chat with new messages:", updatedChat);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [currentUser.userId, currentUser.chatId]
  );

  return { updateMessages };
};

export default useUpdateChatMessages;

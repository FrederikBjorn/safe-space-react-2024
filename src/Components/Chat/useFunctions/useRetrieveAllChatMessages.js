import { useCallback } from "react";
import Parse from "parse";

function useRetrieveAllChatMessages() {
  const retrieveAllChatMessages = useCallback(
    async (chatQuery, currentUser) => {
      const chat = await chatQuery.get(currentUser.chatId);
      const messages = chat.get("messages") || [];

      const messagesWithSenderInfo = await Promise.all(
        messages.map(async (messagePointer) => {
          const message = await messagePointer.fetch();
          const sendUserId = message.get("sender_user").id;

          const userProfileQuery = new Parse.Query("user_profile");
          userProfileQuery.equalTo("objectId", sendUserId);
          const userProfile = await userProfileQuery.first();

          return {
            id: message.id,
            text: message.get("text"),
            isOwnMessage: message.get("sender_user").id === currentUser.userId,
            createdAt: message.get("createdAt"),
            profilePic: userProfile.get("profile_pic").url(),
          };
        })
      );
      return messagesWithSenderInfo;
    },
    []
  );
  return { retrieveAllChatMessages };
}

export default useRetrieveAllChatMessages;

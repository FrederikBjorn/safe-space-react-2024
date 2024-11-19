import { useCallback } from "react";
import Parse from "parse";
import { useUserStore } from "../../UserData/useUserStore";

const useRetrieveChatMessages = () => {
  const { currentUser } = useUserStore();

  const getMessages = useCallback(async () => {
    const Chat = Parse.Object.extend("chat");
    const chatQuery = new Parse.Query(Chat);

    try {
      const chat = await chatQuery.get(currentUser.chatId);
      console.log("Retrieved chat:", chat);

      const messages = chat.get("messages") || [];

      // Here i go through all the Pointers to a message
      const messagesWithSenderInfo = await Promise.all(
        messages.map(async (messagePointer) => {
          // Here i get the specific message
          const message = await messagePointer.fetch();
          const sendUserId = message.get("sender_user").id;

          const userProfileQuery = new Parse.Query("user_profile");
          userProfileQuery.equalTo("objectId", sendUserId);
          const userProfile = await userProfileQuery.first();

          return {
            text: message.get("text"),
            isOwnMessage: message.get("sender_user").id === currentUser.userId,
            createdAt: message.get("createdAt"),
            profilePic: userProfile.get("profile_pic").url(),
          };
        })
      );

      console.log(
        "Retrieved messages with sender info:",
        messagesWithSenderInfo
      );

      return messagesWithSenderInfo;
    } catch (error) {
      console.error("Error retrieving messages:", error);
      return [];
    }
  }, [currentUser.chatId, currentUser.userId]);

  return { getMessages };
};

export default useRetrieveChatMessages;

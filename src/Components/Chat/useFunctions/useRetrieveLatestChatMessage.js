import { useCallback } from "react";
import Parse from "parse";

function useRetrieveLatestChatMessage() {
  const retrieveLatestChatMessage = useCallback(async (chat, currentUser) => {
    const messages = chat.get("messages");
    const messagePointer = messages[messages.length - 1];
    const message = await messagePointer.fetch();

    const sendUserId = message.get("sender_user").id;

    const userProfileQuery = new Parse.Query("user_profile");
    userProfileQuery.equalTo("objectId", sendUserId);

    const userProfile = await userProfileQuery.first();

    const text = message.get("text");
    const createdAt = message.get("createdAt");
    const profilePic = userProfile.get("profile_pic").url();
    const isOwnMessage = message.get("sender_user").id === currentUser.userId;

    return { id: message.id, text, createdAt, profilePic, isOwnMessage };
  }, []);
  return { retrieveLatestChatMessage };
}

export default useRetrieveLatestChatMessage;

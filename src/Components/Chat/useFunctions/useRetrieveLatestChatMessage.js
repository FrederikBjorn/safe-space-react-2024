import Parse from "parse";

function useRetrieveLatestChatMessage() {
  const retrieveLatestChatMessage = async (message, currentUser) => {
    const sendUserId = message.get("sender_user").id;

    const userProfileQuery = new Parse.Query("user_profile");
    userProfileQuery.equalTo("objectId", sendUserId);

    const userProfile = await userProfileQuery.first();

    const text = message.get("text");
    const createdAt = message.get("createdAt");
    const profilePic = userProfile.get("profile_pic").url();
    const isOwnMessage = message.get("sender_user").id === currentUser.userId;

    return { id: message.id, text, createdAt, profilePic, isOwnMessage };
  };
  return { retrieveLatestChatMessage };
}

export default useRetrieveLatestChatMessage;

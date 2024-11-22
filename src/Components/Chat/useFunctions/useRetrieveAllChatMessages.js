import Parse from "parse";

function useRetrieveAllChatMessages() {
  const retrieveAllChatMessages = async (messagesQuery, currentUser) => {
    const messages = await messagesQuery.find();

    const messagesWithSenderInfo = await Promise.all(
      messages.map(async (message) => {
        const sendUserId = message.get("sender_user").id;

        const userProfileQuery = new Parse.Query("user_profile");
        userProfileQuery.equalTo("objectId", sendUserId);
        const userProfile = await userProfileQuery.first();

        console.log(message.get("text"));

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
  };
  return { retrieveAllChatMessages };
}

export default useRetrieveAllChatMessages;

function useRetrieveAllChatMessages() {
  const retrieveAllChatMessages = async (messagesQuery, currentUser) => {
    messagesQuery.include(["sender_user", "sender_user.profile_pic"]);

    const messages = await messagesQuery.find();

    const messagesWithSenderInfo = messages.map((message) => {
      const senderUser = message.get("sender_user");
      const profilePicUrl = senderUser.get("profile_pic").url();

      return {
        id: message.id,
        text: message.get("text"),
        isOwnMessage: senderUser.id === currentUser.userId,
        createdAt: message.get("createdAt"),
        profilePic: profilePicUrl,
        file: message.get("file") || null,
        img: message.get("image") || null,
      };
    });

    return messagesWithSenderInfo;
  };
  return { retrieveAllChatMessages };
}

export default useRetrieveAllChatMessages;

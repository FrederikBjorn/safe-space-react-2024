function useRetrieveAllChatMessages() {
  const retrieveAllChatMessages = async (messagesQuery, currentUser) => {
    messagesQuery.include("sender_user");
    messagesQuery.include("sender_user.profile_pic");

    const messages = await messagesQuery.find();

    const messagesWithSenderInfo = messages.map((message) => {
      const senderUser = message.get("sender_user");

      const file = message.get("file");
      const img = message.get("image");

      const profilePicUrl = senderUser.get("profile_pic").url();

      return {
        id: message.id,
        text: message.get("text"),
        isOwnMessage: senderUser.id === currentUser.userId,
        createdAt: message.get("createdAt"),
        profilePic: profilePicUrl,
        ...(file && { file: file }),
        ...(img && { img: img }),
      };
    });

    return messagesWithSenderInfo;
  };
  return { retrieveAllChatMessages };
}

export default useRetrieveAllChatMessages;

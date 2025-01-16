function useRetrieveLatestChatMessage() {
  const retrieveLatestChatMessage = async (message, currentUser) => {
    const senderUser = message.get("sender_user");
    const profilePic = senderUser.get("profile_pic").url();
    const text = message.get("text");
    const createdAt = message.get("createdAt");
    const isOwnMessage = senderUser.id === currentUser.userId;

    return {
      id: message.id,
      text,
      createdAt,
      profilePic,
      isOwnMessage,
      file: message.get("file") || null,
      img: message.get("image") || null,
    };
  };

  return { retrieveLatestChatMessage };
}

export default useRetrieveLatestChatMessage;

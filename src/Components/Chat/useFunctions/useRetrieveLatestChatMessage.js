function useRetrieveLatestChatMessage() {
  const retrieveLatestChatMessage = async (message, currentUser) => {
    const senderUser = message.get("sender_user");
    const profilePic = senderUser.get("profile_pic").url();
    const file = message.get("file");
    const img = message.get("image");

    const text = message.get("text");
    const createdAt = message.get("createdAt");
    const isOwnMessage = senderUser.id === currentUser.userId;

    return {
      id: message.id,
      text,
      createdAt,
      profilePic,
      isOwnMessage,
      ...(file && { file: file }),
      ...(img && { img: img }),
    };
  };

  return { retrieveLatestChatMessage };
}

export default useRetrieveLatestChatMessage;

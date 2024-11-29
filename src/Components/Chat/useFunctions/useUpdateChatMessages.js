import Parse from "parse";
import { useUserStore } from "../../UserData/useUserStore";

const useUpdateChatMessages = () => {
  const { currentUser } = useUserStore();

  const updateMessages = async (messageText, img, file) => {
    try {
      let message = new Parse.Object("message");
      message.set("text", messageText);

      if (img.file) {
        const parseImage = new Parse.File(img.file.name, img.file);
        await parseImage.save();
        message.set("image", parseImage);
      }

      if (file.file) {
        const parseFile = new Parse.File(file.file.name, file.file);
        await parseFile.save();
        message.set("file", parseFile);
      }

      // I am creating a pointer to user_profile
      const userProfile = new Parse.Object("user_profile");
      userProfile.id = currentUser.userId;
      message.set("sender_user", userProfile);

      // I am creating a pointer to specific chat
      const userChat = new Parse.Object("chat");
      userChat.id = currentUser.chatId;
      message.set("chat", userChat);

      await message.save();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return { updateMessages };
};

export default useUpdateChatMessages;

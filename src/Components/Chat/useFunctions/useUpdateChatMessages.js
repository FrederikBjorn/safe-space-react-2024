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

      // Retrieve the chat object to get a pointer and its ACL
      const chatQuery = new Parse.Query("chat");
      const chat = await chatQuery.get(currentUser.chatId);
      message.set("chat", chat);
      const chatAcl = chat.getACL();

      // Setting the same ACL for the message
      message.setACL(chatAcl);

      await message.save();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return { updateMessages };
};

export default useUpdateChatMessages;

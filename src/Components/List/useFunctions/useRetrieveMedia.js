import Parse from "parse";
import { useUserStore } from "../../UserData/useUserStore";

function useRetrieveMedia() {
  const { currentUser } = useUserStore();

  const retrieveMedia = async () => {
    try {
      const currentChatId = await currentUser.chatId;
      const messagesQuery = new Parse.Query("message");
      const chatPointer = new Parse.Object("chat");
      chatPointer.id = currentChatId;
      messagesQuery.equalTo("chat", chatPointer);
      messagesQuery.select("image", "file");

      const messages = await messagesQuery.find();

      const images = [];
      const files = [];

      messages.forEach((message) => {
        if (message.has("image")) {
          images.push(message.get("image"));
        }
        if (message.has("file")) {
          files.push(message.get("file"));
        }
      });
      return { images, files };
    } catch (error) {
      console.error("Error retrieving media messages:", error);
      return { images: [], files: [] };
    }
  };
  return { retrieveMedia };
}

export default useRetrieveMedia;

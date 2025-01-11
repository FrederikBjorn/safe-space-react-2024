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
      const imageNames = new Set();
      const fileNames = new Set();

      messages.forEach((message) => {
        if (message.has("image")) {
          const imageName = message
            .get("image")
            .name()
            .split("_")
            .slice(1)
            .join("_");
          if (!imageNames.has(imageName)) {
            images.push(message.get("image"));
            imageNames.add(imageName);
          }
        }
        if (message.has("file")) {
          const fileName = message
            .get("file")
            .name()
            .split("_")
            .slice(1)
            .join("_");
          if (!fileNames.has(fileName)) {
            files.push(message.get("file"));
            fileNames.add(fileName);
          }
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

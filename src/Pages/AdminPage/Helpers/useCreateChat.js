import Parse from "parse";

export function useCreateChat() {
  async function createChat() {
    const chatQuery = new Parse.Query("chat");
    const adminId = process.env.REACT_APP_PARSE_ADMIN_ID;

    try {
      const chatCount = await chatQuery.count();
      const newChat = new Parse.Object("chat");

      newChat.set("chat_number", chatCount + 1);

      const chatAcl = new Parse.ACL();

      // Ensure that Thanos (admin) can access
      chatAcl.setReadAccess(adminId, true);
      chatAcl.setWriteAccess(adminId, true);
      newChat.setACL(chatAcl);

      // Save it...
      const savedChat = await newChat.save();
      console.log(
        "New chat created with objectId: " +
          savedChat.id +
          " and chat_number: " +
          savedChat.get("chat_number")
      );
    } catch (error) {
      console.error("Error while creating chat: ", error);
    }
  }
  return { createChat };
}

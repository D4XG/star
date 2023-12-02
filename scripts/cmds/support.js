module.exports = {
  config: {
    name: "support",
    aliases: ["supportgc"],
    version: "1.0",
    author: "D4XG",
    role: 0,
    shortDescription: {
      en: "Adds the user to a specific thread."
    },
    longDescription: {
      en: "Adds the user to a specific thread and sends them a notification message."
    },
    category: "System",
    guide: {
      en: "Use {pn} to add yourself to the support thread."
    }
  },
  onStart: async function ({ api, event, args }) {
    const threadID = "6982539628475780"; // ID of the thread to add the user to

    try {
      await api.addUserToGroup(event.senderID, threadID);
      api.sendMessage("You have been added to our SUPPORT group chat\nPlease check your Spam or Message Request folder if you can't find the group chat.", event.senderID);
    } catch (error) {
      api.sendMessage("Failed to add you to the support group chat.", event.senderID);
    }
  }
};
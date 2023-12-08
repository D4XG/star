const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "autosen",
    version: "1.0.0",
    author: "NTKhang",
    countDown: 5,
    role: 3,
    shortDescription: {
      en: "Toggle automatic marking as seen for new messages.",
    },
    longDescription: {
      en: "This command allows you to toggle automatic marking as seen for new messages in the thread.",
    },
    category: "config",
    guide: {
      en: "To turn on automatic marking as seen: !autosen on\nTo turn off automatic marking as seen: !autosen off",
    },
  },

  onStart: async function ({ api, event, args }) {
    if (args.length !== 1 || !["on", "off"].includes(args[0].toLowerCase())) {
      return api.sendMessage(
        "Invalid command format. Usage:\nTo turn on automatic marking as seen: !autosen on\nTo turn off automatic marking as seen: !autosen off",
        event.threadID
      );
    }

    const action = args[0].toLowerCase();
    const autosenPath = path.join(__dirname, "cache", "autosen.txt"); // Fixed variable name

    if (action === "on") {
      // Turn on automatic marking as seen
      fs.writeFileSync(autosenPath, "true");

      // Continuously mark messages as seen
      setInterval(() => {
        api.markAsSeen(() => {});
      }, 5000); // Adjust the interval as needed

      api.sendMessage(
        "Đã bật chế độ tự động seen khi có tin nhắn mới",
        event.threadID,
        event.messageID
      );
    } else if (action === "off") {
      // Turn off automatic marking as seen
      fs.writeFileSync(autosenPath, "false");
      api.sendMessage(
        "Đã tắt chế độ tự động seen khi có tin nhắn mới",
        event.threadID,
        event.messageID
      );
    }
  },

  handleEvent: async function ({ api, event }) {
    const autosenPath = path.join(__dirname, "cache", "autosen.txt"); // Fixed variable name
    const isEnable = fs.readFileSync(autosenPath, "utf-8");

    if (isEnable === "true") {
      // Mark all messages as seen
      api.markAsSeenAll(() => {});
    }
  },
};

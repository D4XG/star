const fs = require("fs");

module.exports = {
  config: {
    name: "out",
    aliases: ["leave"],
    version: "1.9",
    author: "D4XG",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Remove bot from the box",
    },
    longDescription: {
      en: "Remove bot from the group",
    },
    category: "System",
    guide: {
      en: "/out: Leave the current box (thread)\n/out {threadID}: Leave the box with the specified threadID",
    },
  },
  onStart: async function ({ api, event, args }) {
    const sendMessageAndLeave = (message, threadID) => {
      // Specify the path to your local image file
      const imagePath = "images/leave.webp";

      // Read the image file
      const imageBuffer = fs.readFileSync(imagePath);

      // Send the leave message with attachment
      api.sendMessage(
        {
          body: message,
          attachment: fs.createReadStream(imagePath),
        },
        threadID
      );

      // Wait for 5 seconds and then leave the box (thread)
      setTimeout(() => {
        api.removeUserFromGroup(api.getCurrentUserID(), threadID);
      }, this.config.countDown * 1000);
    };

    if (!args[0]) {
      // Leave the current box (thread)
      sendMessageAndLeave(
        `Receive orders from Admin\nThe bot will automatically leave the box (${event.threadID}) after ${this.config.countDown} seconds.`,
        event.threadID
      );
    } else {
      // Check if args[0] is a valid thread ID (numeric)
      if (!isNaN(args[0])) {
        const threadID = args[0];
        // Leave the specified box (thread)
        sendMessageAndLeave(
          `Receive command from Admin\nThe bot will automatically leave the box (${threadID}) after ${this.config.countDown} seconds.\n\n- Contact: facebook.com/d4xgg\n- Support: dsc.gg/daxg`,
          threadID
        );
      } else {
        // Invalid threadID provided
        return api.sendMessage(
          {
            body: "Invalid threadID provided. Please use a numeric threadID or leave it blank to leave the current box.",
          },
          event.threadID
        );
      }
    }
  },
};

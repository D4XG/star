const fs = require('fs');
module.exports = {
  config: {
    name: "women",
    version: "1.0",
    author: "Shahadat",
    countDown: 0,
    role: 0,
    shortDescription: "Women ☕",
    longDescription: "Women ☕",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "women") {
      return message.reply({
        body: "women ☕",
        attachment: fs.createReadStream(`scripts/cmds/assets/video/women.mp4`),
      });
    }
  }
};
const fs = require('fs');
module.exports = {
  config: {
    name: "chd",
    version: "1.0",
    author: "Shahadat",
    countDown: 0,
    role: 0,
    shortDescription: "CHĐ BELIVER ☕",
    longDescription: "CHĐ BELIVER ☕",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "chđ") {
      return message.reply({
        body: "Cap in image",
        attachment: fs.createReadStream(`scripts/cmds/assets/image/chd.jpeg`),
      });
    }
  }
};
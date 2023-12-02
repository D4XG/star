const fs = require('fs');
module.exports = {
  config: {
    name: "sus",
    version: "1.0",
    author: "U-P-O-L",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "sus") {
      return message.reply({
        body: "sus 🥹",
        attachment: fs.createReadStream("sus.mp3"),
      });
    }
  }
};
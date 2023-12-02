const fs = require('fs');
module.exports = {
  config: {
    name: "ara",
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
    if (event.body && event.body.toLowerCase() === "ara") {
      return message.reply({
        body: "ara ara 🥰",
        attachment: fs.createReadStream("ara.mp3"),
      });
    }
  }
};
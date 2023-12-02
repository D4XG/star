const fs = require('fs');
module.exports = {
  config: {
    name: "danyeuai",
    version: "1",
    author: "dan with love",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "dan yeu ai?") {
      return message.reply({
        body: "@Dua Hau",
        attachment: fs.createReadStream(`scripts/cmds/assets/image/emuach.jpg`),
      });
    }
  }
};
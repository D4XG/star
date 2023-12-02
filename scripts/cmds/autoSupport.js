const fs = require('fs');
module.exports = {
  config: {
    name: "supportauto",
    version: "1.0",
    author: "D4XG",
    countDown: 0,
    role: 0,
    shortDescription: "Auto SSUPPORT | List support server",
    longDescription: "Auto SUPPORT | List support server",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "support") {
      return message.reply({
        body: "Friendly Reminder 👋🏻\nIt seems like you have a question or issue related to STAR BOT.\n\nPlease create a ticket in our discord server or submit a ticket in the docs below ⬇\n- Discord: https://dsc.gg/daxg\n- Docs: https://forms.gle/wKditGmgFbynyavn9\nOr use /support to get added to Support Thread by STAR ( sometimes cant )\nBe patient, someone will assist you as soon as possible!",
        attachment: fs.createReadStream(`scripts/cmds/assets/image/support.png`),
      });
    }
  }
};
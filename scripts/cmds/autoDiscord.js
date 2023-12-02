const fs = require('fs');
module.exports = {
  config: {
    name: "discord",
    version: "1.0",
    author: "D4XG",
    countDown: 0,
    role: 0,
    shortDescription: "Auto DISCORD | Support server",
    longDescription: "Auto DISCORD | Support server",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "discord") {
      return message.reply({
        body: "Wanna join our Discord community?\n- Click here to be part of us: https://dsc.gg/daxg\n- Bot | Server powered by D4XG",
        attachment: fs.createReadStream(`scripts/cmds/assets/image/dsc.ggBANNER.png`),
      });
    }
  }
};
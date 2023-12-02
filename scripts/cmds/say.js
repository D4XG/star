module.exports.config = {
  name: "say", 
    version: "1.0", 
    countDown: 1, 
    role: 0, 
    shortDescription: '', 
    longDescription: 'Khiến bot trả về file âm thanh của chị google thông qua văn bản', 
    category: "owner",
};

module.exports.onStart = async function({ message, event, args }) {
  try {
    const { createReadStream, unlinkSync } = require("fs-extra");
    const { resolve } = require("path");
    const axios = require("axios")
    var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    var languageToSay =  "Vi"// (["ru","en","ko","ja"].some(item => content.indexOf(item) == 0)) ? content.slice(0, content.indexOf(" ")) : global.config.language;
    var msg = (languageToSay != "Vi") ? content.slice(3, content.length) : content;
    //await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, path);
    return message.reply({ attachment: await global.utils.getStreamFromURL(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`) });
  } catch (e) { return console.log(e) };
}
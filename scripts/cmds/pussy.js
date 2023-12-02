const axios = require('axios');
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pussy",
    aliases: ["lồn"],
    version: "1.0",
    author: "MILAN gay",
    countDown: 10,
    role: 0,
    shortDescription: "get nsfw images",
    longDescription: "",
    category: "adult",
    guide: {
      vi: "{p} ",
      en: "{p} "
    }
  },

  onStart: async function ({ message, args, event, api }) {
  try {
 const { data } = await axios.get("https://www.nguyenmanh.name.vn/api/nsfw/pussy?apikey=krwWfbvh");
 const url = await axios.get(data.url, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/cache/gaidep.jpg", Buffer.from(url.data, "utf-8"));
 const msg = "";
 const Img = [
 fs.createReadStream(__dirname + "/cache/gaidep.jpg")
 ];
 return api.sendMessage({
 body: msg,
 attachment: Img
 }, event.threadID, event.messageID);
 } catch (error) {
 console.error(error);
 }
 }
};
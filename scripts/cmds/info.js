const fs = require('fs');
const moment = require('moment-timezone'); 
module.exports = { config: { 
  name: "info", 
  version: "1.0", 
  countDown: 20, 
  role: 0, 
  shortDescription: { vi: "Get owner infomation", en: "Get owner infomation" }, 
  longDescription: { vi: "Get owner infomation", en: "Get owner infomation" }, 
  category: "owner", 
  guide: { en: "" }, 
  envConfig: {} }, 
      onStart: async function ({ message })
       
        
  { const botName = "STAR"; 
   const botPrefix = "/";
   const authorName = "D4XG"; 
     teamName = "DAXGCommunity"; 
   const authorFB = "https://facebook.com/d4xgg";
   const tikTok = "tiktok.com/@handletrouble";
   const urls = JSON.parse(fs.readFileSync('scripts/cmds/percy.json'));
   const link = urls[Math.floor(Math.random() * urls.length)]; 
   const now = moment().tz('Asia/Jakarta');  
   const date = now.format('MMMM Do YYYY'); const time = now.format('h:mm:ss A'); 
   const uptime = process.uptime(); 
   const seconds = Math.floor(uptime % 60); 
   const minutes = Math.floor((uptime / 60) % 60); 
   const hours = Math.floor((uptime / (60 * 60)) % 24); 
   const days = Math.floor(uptime / (60 * 60 * 24)); 
   const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`; message.reply({ body: `Owner and STAR info
\ Name: ${botName}
\ Bot Prefix: ${botPrefix}
\ Owner: ${authorName}
\ Facebook: ${authorFB}
\ TikTok: ${tikTok}
\ Date: ${date}
\ Time: ${time}
\ Organization: ${teamName}
\ Uptime: ${uptimeString}
\===============`, attachment: await global.utils.getStreamFromURL(link) }); }, onChat: async function({ event, message, getLang }) { if (event.body && event.body.toLowerCase() === "info") { this.onStart({ message }); } } };
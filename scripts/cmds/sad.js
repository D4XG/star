const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "Sad",
    aliases: ["sad"],
    version: "1.1",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "sad with text",
    longDescription: "sad with text",
    category: "image",
    guide: {
      en: " {pn}sad"
    }
  },

  onStart: async ({ api, event }) => {
    try {
      const response = await axios.get(SAD_QUOTES_API);
      const { quote, author } = response.data;

      const imageUrl = 'https://i.imgur.com/pCd21MK.gif';
      const imageFileName = 'img.png';
      const cacheFolderPath = path.join(__dirname, 'cache');
      const imagePath = path.join(cacheFolderPath, imageFileName);

      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }

      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
      } catch (error) {
        console.error('Error downloading the image:', error);
        api.sendMessage("Error fetching quotes or sending the image.", event.threadID, event.messageID);
        return;
      }

      const message = {
        body: quote + ' - ' + author,
        attachment: fs.createReadStream(imagePath),
      };

      try {
        await api.sendMessage(message, event.threadID);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      fs.unlinkSync(imagePath);
    } catch (error) {
      console.error('Error fetching quotes or sending the image:', error);
      api.sendMessage("Error fetching quotes or sending the image.", event.threadID, event.messageID);
    }
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});
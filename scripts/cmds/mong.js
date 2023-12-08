const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "mong",
    version: "2.0.0",
    role: 0,
    author: "Vtuan | Convert by D4XG",
    description: "Xem ảnh",
    category: "Random-img",
    aliases: ["mông"],
    countDown: 2,
  },

  onStart: async function ({ api, event }) {
    try {
      const botimgPath = path.resolve(__dirname, "../../botimg/mirai.json");
      const girl = require(botimgPath);

      function downloadAndSendImage(image, fileName, callback) {
        request(image)
          .pipe(fs.createWriteStream(__dirname + `/${fileName}`))
          .on("close", () => {
            callback(fs.createReadStream(__dirname + `/${fileName}`));
          });
      }

      const getRandomImage = () =>
        girl[Math.floor(Math.random() * girl.length)].trim();

      const image1 = getRandomImage();
      const image2 = getRandomImage();
      const image3 = getRandomImage();
      const image4 = getRandomImage();

      const callback = (attachment1, attachment2, attachment3, attachment4) => {
        api.sendMessage(
          {
            body: "",
            attachment: [attachment1, attachment2, attachment3, attachment4],
          },
          event.threadID,
          () => {
            // Cleanup the files
            fs.unlinkSync(__dirname + `/1.png`);
            fs.unlinkSync(__dirname + `/2.png`);
            fs.unlinkSync(__dirname + `/3.png`);
            fs.unlinkSync(__dirname + `/4.png`);
          }
        );
      };

      downloadAndSendImage(image1, "1.png", (attachment1) => {
        downloadAndSendImage(image2, "2.png", (attachment2) => {
          downloadAndSendImage(image3, "3.png", (attachment3) => {
            downloadAndSendImage(image4, "4.png", (attachment4) => {
              callback(attachment1, attachment2, attachment3, attachment4);
            });
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  },

  run: async ({ api, event }) => {
    // Your existing run function code goes here
    // ...
  },
};

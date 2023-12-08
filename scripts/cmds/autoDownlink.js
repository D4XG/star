const axios = require("axios");
const fs = require("fs");
const moment = require("moment-timezone");

const isURL = (u) => /^http(|s):\/\//.test(u);

exports.onChat = async function ({ api, message, event, args, commandName }) {
  try {
    const str = event.body;
    const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
    const now = moment().tz("Asia/Jakarta");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");
    const head = (app) => `===『 ${app.toUpperCase()} 』===\n✦ ━━━━━ ★ ━━━━━ ✦`;
    // const head = app => '';

    if (isURL(str)) {
      if (/fb|facebook/.test(str)) {
        const json = await infoPostFb(str);
        console.log(json);
        const body = `${head("FACEBOOK")}\n- Tiêu Đề: ${json.message}`;
        const fil = (type) =>
          json.attachment.filter(($) => $.__typename == type);
        const photo = fil("Photo");
        const video = fil("Video");

        const attachment = [];
        for (const i of photo) {
          try {
            const img = i.photo_image || i.image || {};
            attachment.push(await streamURL(img.uri, "jpg"));
          } catch {
            continue;
          }
        }
        if (attachment.length > 0) {
          await send({
            body,
            attachment,
          });
        }

        for (const i of video) {
          try {
            send({
              body,
              attachment: await streamURL(
                i.browser_native_hd_url || i.browser_native_sd_url,
                "mp4"
              ),
            });
          } catch {
            continue;
          }
        }
      } else if (
      /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO TIKTOK */
        /(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//.test(str)
      ) {
        const json = await infoPostTT(str);
        let attachment = [];
        if (json.images != undefined) {
          for (const $ of json.images) {
            attachment.push(await streamURL($, "png"));
          }
        } else {
          attachment = await streamURL(json.play, "mp4");
        }

        send({
          body: `${head("TIKTOK")}\nAuthor: ${json.author.nickname}\nTitle : ${
            json.title
          }`,
          attachment,
        });
      } else if (
      /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO YOUTUBE */
        /(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//.test(str)
      ) {
        const res = await axios.get(
          `https://phungtuanhai.site/youtube/download?apikey=PTH&id=${str}`
        );
        send({
          body: `\n[💬] → title: ${res.data.data.title}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝘃𝗶𝗱𝗲𝗼: ${res.data.data.duration}`,
          attachment: await streamURL(res.data.data.videurl, "mp4"),
        });
      } else if (/ibb\.co/.test(str)) {
      /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO IBB */
        send({
          body: `${head("IMGBB")}\n`,
          attachment: await streamURL(str, str.split(".").pop()),
        });
      } else if (/imgur\.com/.test(str)) {
      /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO IMGUR */
        send({
          body: `${head("IMGUR")}\n`,
          attachment: await streamURL(str, str.split(".").pop()),
        });
      } else if (/capcut\.com/.test(str)) {
      /*AUTODOWN CAPCUT VIIDEO */
        var res = await axios.get(
          `https://api-0703.0703-opa.repl.co/capcut?url=${str}`
        );
        const title = res.data.title;
        const description = res.data.description;
        const usage = res.data.usage;
        const link = res.data.videoUrl;
        /*const stream = (await axios.get(link,{responseType: "arraybuffer"})).data 
const path = __dirname+`/cache/1.mp4`;
fs.writeFileSync(path, Buffer.from(stream, "utf-8"));
return api.sendMessage({body: `📸==== [ 𝗖𝗔𝗣𝗖𝗨𝗧 ] ====📸
✦ ━━━━━ ★ ━━━━━ ✦

📝 𝗧𝗶𝘁𝗹𝗲: ${title}
😻 𝗠𝗼̂ 𝘁𝗮̉: ${description}
🌸 𝗟𝘂̛𝗼̛̣𝘁 𝗱𝘂̀𝗻𝗴: ${usage}
🧸 𝗟𝗶𝗻𝗸 𝗰𝗮𝗽𝗰𝘂𝘁: ${text}
🔗 𝗟𝗶𝗻𝗸 𝘃𝗶𝗱𝗲𝗼: ${link}

👉 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗲𝗱𝗶𝘁 𝘃𝗶𝗱𝗲𝗼 𝘁𝗵𝗶̀ 𝗮̂́𝗻 𝘃𝗼̂ 𝗹𝗶𝗻𝗸 𝗰𝗮𝗽𝗰𝘂𝘁 𝗼̛̉ 𝘁𝗿𝗲̂𝗻 đ𝗲̂̉ 𝗲𝗱𝗶𝘁 𝗻𝗵𝗮́`, attachment: fs.createReadStream(path)},event.threadID,() => fs.unlinkSync(path),event.messageID)*/
        send({
          body: `${head(
            "CAPCUT"
          )}\n→ Title: ${title}\n→ Description : ${description}\n→ Views : ${usage}\n`,
          attachment: await streamURL(link, "mp4"),
        });
      } else if (/catbox\.moe/.test(str)) {
      /* TỰ ĐỘNG TẢI ẢNH, VIDEO, AUDIO CỦA FILE CATBOX*/
        send({
          body: `${head("FILE-CATBOX")}\n`,
          attachment: await streamURL(str, str.split(".").pop()),
        });
      } else if (/soundcloud\.com/.test(str)) {
      /* TỰ ĐỘNG TẢI ẢNH HOẶC NHẠC SOUNDCLOUD */
        var res = await axios.get(
          `https://phungtuanhai.site/soundcloud/dl?apikey=PTH&url=${str}`
        );
        const stream = (
          await axios.get(res.data.result.download, {
            responseType: "arraybuffer",
          })
        ).data;
        const path = __dirname + `/cache/1.mp3`;
        fs.writeFileSync(path, Buffer.from(stream, "utf-8"));
        api.sendMessage(
          {
            body: `${head("SOUNDCLOUD")}\n→ Title: ${
              res.data.result.title
            }\n\n→ Quality: ${res.data.result.quality}\n\n→ Duration: ${
              res.data.result.duration
            }\n\n→ Thumbnail: ${res.data.result.thumbnail}\n\n→ Download: ${
              res.data.result.download
            }`,
            attachment: fs.createReadStream(path),
          },
          event.threadID,
          () => fs.unlinkSync(path),
          event.messageID
        );
      } else if (/zingmp3\.vn/.test(str)) {
      /* TỰ ĐỘNG TẢI NHẠC ZINGMP3 */
        /*  const stream = (await axios.get(`${global.config.LINK[5]}/zingmp3/download?apikey=PTH&link=${str}`, { responseType: "arraybuffer"})).data
                    const path = __dirname+`/cache/1.mp3`;
                    fs.writeFileSync(path, Buffer.from(stream, "utf-8"));
          api.sendMessage({ attachment: fs.createReadStream(path)},event.threadID,() => fs.unlinkSync(path),event.messageID)*/
        send({
          body: `${head("ZINGMP3")}\n`,
          attachment: await streamURL(
            `https://phungtuanhai.site/zingmp3/download?apikey=PTH&link=${str}`,
            "mp3"
          ),
        });
      } else if (
      /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO PINTEREST */
        /(^https:\/\/)((www)\.)?(pinterest|pin)*\.(com|it)\//.test(str)
      ) {
        const res = await axios.get(
          `https://api.imgbb.com/1/upload?key=588779c93c7187148b4fa9b7e9815da9&image=${str}`
        );
        send({
          body: `${head("PINTEREST")}\n- Link: ${res.data.data.image.url}`,
          attachment: await streamURL(res.data.data.image.url, "jpg"),
        });
      } else if (/instagram\.com/.test(str)) {
      /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO INSTAGRAM */
        const res = await axios.get(
          `https://phungtuanhai.site/instagram/dlpost?apikey=PTH&url=${str}`
        );
        const { videos = [{}], images } = res.data;
        let attachment = [];

        if (videos[0] != undefined) {
          attachment = await streamURL(videos[0], "mp4");
        } else if (images != undefined) {
          for (const $ of typeof images == "string" ? [images] : images) {
            attachment.push(await streamURL($, "png"));
          }
        }
        send({
          body: `${head("INSTAGRAM")}\n Tiêu Đề: ${res.data.caption}`,
          attachment,
        });
      }
    }
  } catch (e) {
    console.log("Error", e);
  }
};
exports.onStart = () => {};
exports.config = {
  name: "autodownlink",
  aliases: ["autodown"],
  version: "1.0",
  author: "D4XG | Convert by Quat & Truong", // convert to Goat BY BraSL
  countDown: 0,
  role: 0,
  shortDescription: "autodown load video and image",
  longDescription: "autodown load video and image",
  category: "user",
};

function streamURL(url, type) {
  return axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((res) => {
      const path = __dirname + `/cache/${Date.now()}.${type}`;
      fs.writeFileSync(path, res.data);
      setTimeout((p) => fs.unlinkSync(p), 1000 * 60, path);
      return fs.createReadStream(path);
    });
}

function infoPostTT(url) {
  return axios({
    method: "post",
    url: `https://tikwm.com/api/`,
    data: {
      url,
    },
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.data.data);
}

function infoPostFb(url) {
  return axios
    .get(`https://duongkum999.codes/fb/info-post?url=${url}`)
    .then((res) => res.data);
}

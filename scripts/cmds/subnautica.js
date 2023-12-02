const path = require("path");
const axios = require("axios");
const fs = require("fs-extra");
module.exports = {
  config: {
    name: "subnautica",
    aliases: ["sub"],
    description:
      "Câu cá ở một hành tinh khác, dựa theo tựa game Subnautica khiến bạn đái ra máu vì độ đa dạng của nó UwU",
    guide: {
      vi: "    {pn} register: Đăng kí tham gia vào subnautica\n    {pn} help: Xem bảng sử dụng lệnh trong subnautica\n    {pn} shop: Xem shop subnautica\n    {pn} : Săn cá\n    {pn} custom locate: Custom địa điểm săn\n     + {pn} custom trident: Trang bị trident\n    {pn} bag: Xem túi đồ\n    {pn} info: Xem info bản thân",
      en: "    {pn} register: Đăng kí tham gia vào subnautica\n    {pn} help: Xem bảng sử dụng lệnh trong subnautica\n    {pn} shop: Xem shop subnautica\n    {pn} : Săn cá\n    {pn} custom locate: Custom địa điểm săn\n    {pn} custom trident: Trang bị trident\n    {pn} bag: Xem túi đồ\n    {pn} info: Xem info bản thân",
    },
    category: "media",
    version: "5.0",
    author: "D4XG | Convert by Quat & Truong",
    countDown: 0,
    role: 0,
    envConfig: {
      APIKEY: "",
    },
  },
};

module.exports.checkPath = function (type, senderID) {
  const pathItem = path.join(__dirname, "cauca", `item.json`);
  const pathUser = path.join(
    __dirname,
    "cauca",
    "datauser",
    `${senderID}.json`
  );
  const pathUser_1 = require("./cauca/datauser/" + senderID + ".json");
  const pathItem_1 = require("./cauca/item.json");
  if (type == 1) return pathItem;
  if (type == 2) return pathItem_1;
  if (type == 3) return pathUser;
  if (type == 4) return pathUser_1;
};

module.exports.onLoad = async () => {
  const dir = __dirname + `/cauca/`;
  const dirCache = __dirname + `/cauca/cache/`;
  const dirData = __dirname + `/cauca/datauser/`;
  if (!fs.existsSync(dir))
    fs.mkdirSync(dir, {
      recursive: true,
    });
  if (!fs.existsSync(dirData))
    fs.mkdirSync(dirData, {
      recursive: true,
    });
  if (!fs.existsSync(dirCache))
    fs.mkdirSync(dirCache, {
      recursive: true,
    });
  if (!fs.existsSync(dir + "item.json"))
    (
      await axios({
        url: "https://raw.githubusercontent.com/theguardian132/subnautica/main/datasub.json",
        method: "GET",
        responseType: "stream",
      })
    ).data.pipe(fs.createWriteStream(dir + "data.json"));

  if (!fs.existsSync(dir + "item.json"))
    (
      await axios({
        url: "https://raw.githubusercontent.com/theguardian132/subnautica/main/itemsub.json",
        method: "GET",
        responseType: "stream",
      })
    ).data.pipe(fs.createWriteStream(dir + "item.json"));
  return;
};

module.exports.onStart = async function ({
  api,
  args,
  message,
  event,
  usersData,
  commandName,
}) {
  const { senderID } = event;
  const {
    readFileSync,
    writeFileSync,
    existsSync,
    createReadStream,
    readdirSync,
  } = require("fs-extra");
  const pathData = path.join(
    __dirname,
    "cauca",
    "datauser",
    `${senderID}.json`
  );
  switch (args[0]) {
    case "register":
    case "-r": {
      const nDate = new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
      if (!existsSync(pathData)) {
        var obj = {};
        obj.name = await usersData.get(senderID, "name");
        obj.ID = senderID;
        (obj.mainROD = null), (obj.GPS = {});
        (obj.GPS.locate = null), (obj.GPS.area = null), (obj.fishBag = []);
        obj.point = 0;
        obj.item = [];
        obj.timeRegister = nDate;
        obj.fishBag.push({
          ID: 0,
          name: "Đừng bán con cá này ko là lỗi tao đéo chịu trách nhiệm đâu",
          category: "Unnamed",
          size: 999999,
          sell: 0,
        });
        writeFileSync(pathData, JSON.stringify(obj, null, 4));
        var msg = {
          body: "[ Game Subnautica Câu Cá ]\n──────────────\n✅ Đăng ký game thành công\n🏬 /subnautica shop/-s: Để mua vật phẩm câu cá!  ",
          attachment: await this.subnautica(),
        };
        return message.reply(msg);
      } else
        return message.reply({
          body: "[ Game Subnautica Câu Cá ]\n──────────────\n⚡ Bạn đã đăng ký game rồi!",
          attachment: await this.subnautica(),
        });
    }
    case "shop":
    case "-s": {
      if (!existsSync(pathData)) {
        return message.reply({
          body: "[ Game Subnautica Câu Cá ]\n──────────────\n🦈 Bạn chưa đăng ký tài khoản\n⚡ /subnautica register/-r: Để đăng ký game!",
          attachment: await this.subnautica(),
        });
      }
      return message.reply(
        {
          body: "[ Cửa Hàng Subnautica ]\n──────────────\n1 » 💰 Mua vật phẩm\n2 » 💵 Bán vật phẩm câu được\n3 » ⚡ Nâng cấp/Sửa chửa vật phẩm\n──────────────\n💬 Phản hồi tin nhắn này với lựa chọn của bạn!",
          attachment: await this.subnautica(),
        },
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            type: "shop",
          });
        }
      );
    }
    case "bag":
    case "-b": {
      if (!existsSync(pathData)) {
        return message.reply({
          body: "[ Game Subnautica Câu Cá ]\n──────────────\n🦈 Bạn chưa đăng ký tài khoản\n⚡ /subnautica register/-r: Để đăng ký game!",
          attachment: await this.subnautica(),
        });
      }
      var data = this.checkPath(4, senderID);

      return message.reply(
        {
          body: `[ Túi Đồ Subnautica ]\n──────────────\n1. » 🦈 Số cá câu được:  (SL: ${data.fishBag.length})\n2. » 🔱 Số trident hiện có: (SL: ${data.item.length}) trident\n──────────────\n💬 Vui lòng phản hồi vật phẩm cần xem!`,
          attachment: await this.subnautica(),
        },
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            type: "choosebag",
          });
        }
      );
    }
    case "custom":
    case "-c": {
      if (!existsSync(pathData)) {
        return message.reply({
          body: "[ Game Subnautica Câu Cá ]\n──────────────\n🦈 Bạn chưa đăng ký tài khoản\n⚡ /subnautica register/-r: Để đăng ký game!",
          attachment: await this.subnautica(),
        });
      }
      if (args[1] == "trident") {
        var data = this.checkPath(4, senderID);
        var listItem = "[ Subnautica Chọn Cần Câu ]\n──────────────\n",
          number = 1;
        for (let i of data.item) {
          listItem += `${number++} » 🎣 Tên cần: ${i.name}\n⏱️ Thời gian chờ: ${
            i.countdown
          }s\n⚡ Độ bền: ${i.durability}\n──────────────\n`;
        }
        listItem += "💬 Vui lòng phản hồi để chọn trident chính của bạn!";
        return message.reply(listItem, (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            type: "rodMain",
            data: data,
            item: data.item,
          });
        });
      }
      if (args[1] == "locate") {
        return message.reply(
          {
            body: "[ Chọn Vùng Để Câu Cá ]\n──────────────\n1 » The Crater\n\n2 » Sector Zero\n\n3 »  ?????\n──────────────\n>Reply kèm STT để chọn khu vực",
            attachment: await this.subnautica(),
          },
          (error, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
              type: "location",
            });
          }
        );
      }
    }
    case "help": {
      return message.reply({
        body: "[ Hỗ Trợ Game Subnautica ]\n──────────────\n🦈 subnautica register/-r: Đăng ký game\n🏬 subnautica shop/-s: Cửa hàng câu cá\n🌊 subnautica custom trident \n + custom locate: Lựa chọn khu vực câu cá\n🎒 subnautica bag/-b: Xem túi đồ\n🗂 subnautica info: để xem info người dùng",
        attachment: await this.subnautica(),
      });
    }
    case "info": {
      if (!existsSync(pathData)) {
        return message.reply({
          body: "[ Game Subnautica Câu Cá ]\n──────────────\n🦈 Bạn chưa đăng ký tài khoản\n⚡ /subnautica register/-r: Để đăng ký game!",
          attachment: await this.subnautica(),
        });
      }
      var data = this.checkPath(4, senderID);
      return message.reply({
        body: `[ Info PDA ]\n──────────────\n📋 Name: ${data.name}\n💻 ID: ${
          data.ID
        }\n🔱 Weapon: ${
          data.mainROD != null ? data.mainROD : "Đéo có"
        }\n📂 Storage: ${
          data.fishBag.length != null ? data.fishBag.length : "0"
        }/100\n🗺 Location: ${
          data.GPS.locate != null ? data.GPS.locate : "Không"
        } - ${data.GPS.area != null ? data.GPS.area : "Không"}\n🥽 Item: ${
          data.item.length
        }\n⌚ Time created: ${data.timeRegister} \n\nPowered by Kieu Duy Anh`,
        attachment: await this.subnautica(),
      });
    }
    default: {
      // async function checkTime(cooldown, dataTime) {
      //     if (cooldown - (Date.now() - dataTime) > 0) {

      //         var time = cooldown - (Date.now() - dataTime),
      //             minutes = Math.floor(time / 60000),
      //             seconds = ((time % 60000) / 1000).toFixed(0);
      //         return message.reply(`⏰ Vui lòng mua phóng lao cấp bậc cao hơn để câu liên tiếp trong thời gian ngắn!\n⌚Chờ gian chờ còn lại: ${minutes}:${seconds}!`);
      //     }
      // }
      if (!existsSync(pathData)) {
        return message.reply({
          body: "[ Game Subnautica Câu Cá ]\n───────────────\n⚡ /subnautica help: Để xem cách chơi!",
          attachment: await this.subnautica(),
        });
      }
      var data = this.checkPath(4, senderID);
      if (data.item.length == 0)
        return message.reply(
          `⚡ Bạn chưa có trident, vui lòng vào shop để mua!`
        );
      if (data.fishBag.length >= 100)
        return message.reply(
          `⚡ Hiện đã đầy túi, mau bán bớt cá không nó nổ kho chết con mẹ mày giờ thằng ngu`
        );
      if (data.mainROD == null)
        return message.reply(
          '⚡ Bạn chưa chọn trident để xiên cá\n❗ Vui lòng nhập "/subnautica custom trident" để chọn hàng!'
        );
      if (data.GPS.locate == null || data.GPS.area == null)
        return message.reply(
          '⚡ Bạn chưa chọn địa điểm để câu cá\n❗ Vui lòng nhập "/subnautica custom locate" để chọn địa điểm câu!'
        );
      var rod = data.mainROD;
      var location = data.GPS.locate;
      var area = data.GPS.area;
      var type = this.getFish();
      var findRod = data.item.find((i) => i.name == rod);
      if (findRod.durability <= 0)
        return message.reply(
          "⚡ Trident đã hỏng, bạn cần sửa chữa hoặc chọn Trident mới!"
        );
      //await checkTime(findRod.countdown * 1000, findRod.countdownData)
      if (findRod.countdown * 1000 - (Date.now() - findRod.countdownData) > 0) {
        var time =
            findRod.countdown * 1000 - (Date.now() - findRod.countdownData),
          minutes = Math.floor(time / 60000),
          seconds = ((time % 60000) / 1000).toFixed(0);
        return message.reply(
          `⏰ Vui lòng mua phóng lao cấp bậc cao hơn để câu liên tiếp trong thời gian ngắn!\n⌚Chờ gian chờ còn lại: ${minutes}:${seconds}!`
        );
      }
      findRod.countdownData = Date.now();
      findRod.durability = findRod.durability - 10;
      writeFileSync(
        this.checkPath(3, senderID),
        JSON.stringify(this.checkPath(4, senderID), null, 2)
      );
      if (type == false)
        return message.reply(
          "❎ | Đinh ba phóng trượt hoặc các thủy quái đã vùng vẩy được khỏi trident của bạn!"
        );
      var fil = (await this.dataFish(location, area)).filter(
        (i) => i.category == type
      );
      if (fil.length == 0)
        return message.reply("❎ | Bạn ném lao dính mẹ vào rác");
      var getData = fil[Math.floor(Math.random() * fil.length)];
      var IDF =
        this.checkPath(4, senderID).fishBag[
          parseInt(this.checkPath(4, senderID).fishBag.length - 1)
        ].ID + 1;
      this.checkPath(4, senderID).fishBag.push({
        ID: IDF,
        name: getData.name,
        category: getData.category,
        size: getData.size,
        sell: getData.sell,
        image: getData.image,
      });
      if (findRod.durability < 30)
        return message.reply("Vũ khí sắp gãy, chạy đi fix con mẹ mày đi");
      writeFileSync(
        this.checkPath(3, senderID),
        JSON.stringify(this.checkPath(4, senderID), null, 2)
      );
      var msg = {
        body: `[ Game Subnautica Câu Cá ]\n──────────────\n🎣 Bạn đã phóng chết cmm 1 con cá\n🦈 Tên cá: ${getData.name}\n💵 Giá: ${getData.sell} SC\n📖 Loại cá: ${getData.category}\n📏 Size: ${getData.size}cm`,
        attachment: await this.image(getData.image),
      };
      return message.reply(msg);
    }
  }
};

module.exports.dataFish = async function (a, b) {
  const data = require("./cauca/data.json");
  var loc = data.find((i) => i.location == a);
  var are = loc.area.find((i) => i.name == b);
  return are.creature;
};

module.exports.image = async function (link) {
  var images = [];
  let download = (await axios.get("https://api.kieuduyanh.repl.co/upload?url=" +link, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(
    __dirname + `/cauca/cache/subnautica.png`,
    Buffer.from(download, "utf-8")
  );
  images.push(fs.createReadStream(__dirname + `/cauca/cache/subnautica.png`));
  return images;
};
module.exports.subnautica = async function () {
  var images = [];
  let download = (
    await axios.get("https://i.ibb.co/QcqNxcf/subnauticapage.png", {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(
    __dirname + `/cauca/cache/subnauticapage.png`,
    Buffer.from(download, "utf-8")
  );
  images.push(
    fs.createReadStream(__dirname + `/cauca/cache/subnauticapage.png`)
  );
  return images;
};

module.exports.getFish = function () {
  var rate = Math.floor(Math.random() * 100005) + 1;
  if (rate <= 4000) return false;
  if (rate > 4000 && rate <= 34000) return "Common";
  if (rate > 34000 && rate <= 59000) return "Uncommon";
  if (rate > 59000 && rate <= 79000) return "Rare";
  if (rate > 79000 && rate <= 94000) return "Epic";
  if (rate > 94000 && rate <= 99000) return "Legendary";
  if (rate > 99000 && rate <= 99890) return "Mythical";
  if (rate > 99890 && rate <= 99990) return "Spectral";
  if (rate > 99990 && rate <= 100000) return "Etherial";
  if (rate > 100000 && rate <= 100005) return "Unknown";
};
module.exports.onReply = async function ({
  message,
  Reply,
  event,
  usersData,
  envCommands,
  commandName,
  api,
}) {
  const { body, senderID } = event;
  if (senderID !== Reply.author) return;
  const axios = require("axios");
  const {
    readFileSync,
    writeFileSync,
    existsSync,
    createReadStream,
    unlinkSync,
    writeFile,
  } = require("fs-extra");
  const pathItem = this.checkPath(2, senderID);
  async function checkDur(a, b, c) {
    var data = require("./cauca/item.json");
    var find = data.find((i) => i.name == a);
    if (find !== undefined) {
      if (c == "rate") return (b / find.durability) * 100;
      if (c == "reset") return find.durability;
      return `${b}/${find.durability} (${((b / find.durability) * 100).toFixed(
        0
      )}%)`;
    }
  }
  switch (Reply.type) {
    case "shop": {
      if (body == 1) {
        message.unsend(Reply.messageID);
        var listItem = "[ Shop Cần Câu ]\n──────────────\n",
          number = 1;
        for (let i of pathItem) {
          listItem += `${number++} » 🎣 Tên: ${i.name}\n💵 Giá Coin: ${
            i.price
          }$\n⏱️ Thời gian chờ: ${i.countdown}\n⚡ Độ bền: ${
            i.durability
          }\n──────────────\n`;
        }
        return message.reply(
          listItem +
            "💬 Phản hồi tin nhắn này để chọn cần câu cho bạn, Mỗi lần câu trừ 10 độ bền!",
          (error, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID, ////// all
              author: event.senderID,
              type: "buyfishingrod",
            });
          }
        );
      }
      if (body == 2) {
        message.unsend(Reply.messageID);
        var data = this.checkPath(4, senderID).fishBag;
        if (data.length == 0)
          return message.reply("⚡ Túi của bạn không có gì cả!");
        var Common = data.filter((i) => i.category == "Common");
        var Uncommon = data.filter((i) => i.category == "Uncommon");
        var Rare = data.filter((i) => i.category == "Rare");
        var Epic = data.filter((i) => i.category == "Epic");
        var Legendary = data.filter((i) => i.category == "Legendary");
        var Mythical = data.filter((i) => i.category == "Mythical");
        var Spectral = data.filter((i) => i.category == "Spectral");
        var Etherial = data.filter((i) => i.category == "Etherial");
        var Unknown = data.filter((i) => i.category == "Unknown");
        var listCategory = [
          Common,
          Uncommon,
          Rare,
          Epic,
          Legendary,
          Mythical,
          Spectral,
          Etherial,
          Unknown,
        ];
        return message.reply(
          `[ Subnautica Bán Cá ]\n──────────────\n1 » Cá: Common\n🛍️ Số lượng: ${Common.length}\n\n2 » Cá: Uncommon\n🛍️ Số lượng: ${Uncommon.length}\n\n3 » Cá: Rare\n🛍️ Số lượng: ${Rare.length}\n\n4 » Cá: Epic\n🛍️ Số lượng: ${Epic.length}\n\n5 » Cá: Legendary\n🛍️ Số lượng: ${Legendary.length}\n\n6 » Cá: Mythical\n🛍️ Số lượng: ${Mythical.length}\n\n7 » Cá: Spectral\n🛍️ Số lượng: ${Spectral.length}\n\n8  » Cá: Etherial\n🛍️ Số lượng: ${Etherial.length}\n\n9 » Cá: Unknown\n🛍️ Số lượng: ${Unknown.length}`,
          (error, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
              type: "chooseFish",
              listCategory,
            });
          }
        );
      }
      if (body == 3) {
        message.unsend(Reply.messageID);
        var data = this.checkPath(4, senderID).item;
        var msg = `[ Số Trident Hiện Có ]\n──────────────\n`,
          number = 1;
        for (let i of data) {
          msg += `${number++} » 🎣 Tên cần: ${
            i.name
          }\n⚡ Độ bền: ${await checkDur(
            i.name,
            i.durability,
            0
          )}\n──────────────\n`;
        }
        return message.reply(
          msg +
            "💬 Vui lòng phản hồi vật phẩm muốn sửa, giá sửa bằng 1/3 giá vật phẩm!",
          (error, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
              type: "fixfishingrod",
              list: data,
            });
          }
        );
      } else return message.reply("⚡ Lựa chọn không hợp lệ!");
    }
    case "choosebag": {
      message.unsend(Reply.messageID);
      var data = this.checkPath(4, senderID);
      if (body == 1) {
        if (data.fishBag.length == 0)
          return message.reply("Trong túi của bạn không có nổi cái nịt");
        var listFish = `[ Số Cá Câu Được ]\n──────────────\n`,
          number = 1;
        for (let i of data.fishBag) {
          listFish += `${number++} » 🦈 Tên cá: ${i.name}\n❗ Độ dài: ${
            i.size
          }cm - ${i.category}\n💵 Giá coin: ${i.sell}$\n──────────────\n`;
        }
        return message.reply(listFish);
      }
      if (body == 2) {
        message.unsend(Reply.messageID);
        if (data.item.length == 0)
          return message.reply("⚡ Trong túi của bạn không có vật phẩm nào!");
        var listItemm = `[ Số Cần Câu Hiện Có ]\n──────────────\n`,
          number = 1;
        for (let i of data.item) {
          listItemm += `${number++} » 🎣 Tên cần: ${i.name}\n💵 Giá coin: ${
            i.price
          }$\n⚡ Độ bền: ${i.durability}\n⏱️ Thời gian chờ: ${
            i.countdown
          }s\n──────────────\n`;
        }
        return message.reply(listItemm);
      } else return message.reply("⚡ Lựa chọn không hợp lệ!");
    }
    case "rodMain": {
      var data = Reply.data;
      var item = Reply.item;
      if (parseInt(body) > item.length || parseInt(body) <= 0)
        return message.reply("⚡ Lựa chọn không hợp lệ!");
      message.unsend(Reply.messageID);
      data.mainROD = item[parseInt(body) - 1].name;
      writeFileSync(this.checkPath(3, senderID), JSON.stringify(data, null, 2));
      return message.reply(
        `[ Chọn Trident Thành Công ]\n──────────────\n📌 Đặt trident: ${
          item[parseInt(body) - 1].name
        } làm trident chính thành công!`
      );
    }
    case "location": {
      const data = require("./cauca/data.json");
      if (body < 1 && body > 3)
        return message.reply("⚡ Lựa chọn không hợp lệ!");
      message.unsend(Reply.messageID);
      var listLoca = "[ Chọn Địa Điểm Câu Cá ]\n──────────────\n",
        number = 1;
      for (let i of data[parseInt(body) - 1].area) {
        listLoca += `${number++} » 🌊 Tên: ${i.name}\n──────────────\n`;
      }
      this.checkPath(4, senderID).GPS.locate =
        data[parseInt(body) - 1].location;
      writeFileSync(
        this.checkPath(3, senderID),
        JSON.stringify(this.checkPath(4, senderID), null, 2)
      );
      if (body == 1)
        var images =
          "https://i.imgur.com/SJewp15.png";
      if (body == 2)
        var images =
          "https://i.imgur.com/FtB2vWi.png";
      if (body == 3)
        var images =
          "https://i.imgur.com/ijgql3N.jpg";
      return message.reply(
        {
          body: listLoca + "⚡ Vui lòng chọn địa điểm bạn muốn câu!",
          attachment: await this.image(images),
        },
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            type: "chooseArea",
            area: data[parseInt(body) - 1],
          });
        }
      );
    }
    case "chooseArea": {
      var area = Reply.area;
      var pathh = this.checkPath(4, senderID);
      var pathhh = this.checkPath(3, senderID);
      if (parseInt(body) > area.area.length || parseInt(body) <= 0)
        return message.reply("⚡ Lựa chọn không hợp lệ!");
      message.unsend(Reply.messageID);
      pathh.GPS.area = area.area[parseInt(body) - 1].name;
      writeFileSync(pathhh, JSON.stringify(pathh, null, 2));
      return message.reply(
        `[ Game Subnautica Câu Cá ]\n──────────────\n✅ Chuyển tới vùng: ${
          area.location
        } - ${area.area[parseInt(body) - 1].name} thành công!`
      );
    }
    case "fixfishingrod": {
      if (parseInt(body) > Reply.list.length || parseInt(body) <= 0)
        return message.reply("⚡ Lựa chọn không hợp lệ!");
      var rod = Reply.list[parseInt(body) - 1];
      if ((await checkDur(rod.name, rod.durability, "rate")) > 75)
        return message.reply(
          "⚡ Chỉ sửa được phóng lợn à nhầm phóng lao có độ bền dưới 75%"
        );

      const checkMoneys = await checkMoney(
        senderID,
        parseInt((rod.price * (3 / 4)).toFixed(0))
      );
      if (!checkMoneys)
        return message.reply(
          "⚡ Bạn không đủ coin để thực hiện giao dịch này!"
        );
      message.unsend(Reply.messageID);
      await usersData.subtractMoney(
        senderID,
        parseInt((rod.price * (3 / 4)).toFixed(0))
      );
      rod.durability = await checkDur(rod.name, rod.durability, "reset");
      writeFileSync(
        this.checkPath(3, senderID),
        JSON.stringify(this.checkPath(4, senderID), null, 2)
      );
      return message.reply(
        `[ Sửa Chữa Thành Công ]\n──────────────\n🎣 Cần câu: ${
          rod.name
        }\n💵 Giá sửa chữa: (${parseInt((rod.price * (3 / 4)).toFixed(0))}SC)`
      );
    }
    case "buyfishingrod": {
      if (parseInt(body) > pathItem.length || parseInt(body) <= 0)
        return message.reply("⚡ Lựa chọn không hợp lệ!");
      if (isNaN(body)) return message.reply("⚡ Lựa chọn phải là một số!");
      var data = pathItem[parseInt(body) - 1];
      var checkM = await checkMoney(senderID, data.price);
      if (!checkM)
        return message.reply(
          "⚡ Bạn không đủ STAR COIN để thực hiện giao dịch này!"
        );
      if (this.checkPath(4, senderID).item.some((i) => i.name == data.name))
        return message.reply("⚡ Bạn đã sở hữu vật phẩm này rồi!");
      await usersData.subtractMoney(senderID, data.price);
      this.checkPath(4, senderID).item.push({
        name: data.name,
        price: data.price,
        durability: data.durability,
        countdown: data.countdown,
        countdownData: null,
        image: data.image,
      });
      writeFileSync(
        this.checkPath(3, senderID),
        JSON.stringify(this.checkPath(4, senderID), null, 2)
      );
      message.unsend(Reply.messageID);
      var msg = {
        body: `[ Game Subnautica Câu Cá ]\n──────────────\n✅ Mua thành công cần câu\n🎣 Tên cần: ${data.name}\n💵 Giá mua: ${data.price}SC\n⚡ Độ bền: ${data.durability}\n⏱️ Thời gian chờ: ${data.countdown}s`,
        attachment: await this.image(data.image),
      };
      return message.reply(msg);
    }
    case "chooseFish": {
      if (parseInt(body) > Reply.listCategory.length || parseInt(body) <= 0)
        return message.reply("⚡ Lựa chọn không hợp lệ!");
      message.unsend(Reply.messageID);
      if (Reply.listCategory[parseInt(body) - 1].length == 0)
        return message.reply("⚡ Không có con cá nào hết á, hmmm!");
      var fish = "[ Subnautica Bán Cá ]\n──────────────\n",
        number = 1;
      for (let i of Reply.listCategory[parseInt(body) - 1]) {
        fish += `${number++} » 🦈 Tên cá: ${i.name} - ${i.size}cm\n❗ Loại: ${
          i.category
        }\n💵 Giá coin: ${i.sell}$\n──────────────\n`;
      }
      return message.reply(
        fish +
          "💬 Phản hồi số thứ tự để bán ( có thể phản hồi nhiều số ) hoặc phản hồi 'all' để bán tất cả cá!\nNote: Admin Kieu Duy Anh đã fix thành công lỗi bug tiền.",
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            type: "sell",
            list: Reply.listCategory[parseInt(body) - 1],
          });
        }
      );
    }
    case "sell": {
      if (
        (parseInt(body) > Reply.list.length || parseInt(body) <= 0) &&
        body.toLowerCase() != "all"
      )
        return message.reply("⚡ Lựa chọn hông hợp lệ!");
      message.unsend(Reply.messageID);
      var bag = this.checkPath(4, senderID).fishBag;
      var coins = 0;
      if (body.toLowerCase() == "all") {
        for (let i of Reply.list) {
          await usersData.addMoney(senderID, parseInt(i.sell));
          coins += parseInt(i.sell);
          console.log(i.ID);
          var index = this.checkPath(4, senderID).fishBag.findIndex(
            (item) => item.ID == i.ID
          );
          bag.splice(index, 1);
          writeFileSync(
            this.checkPath(3, senderID),
            JSON.stringify(this.checkPath(4, senderID), null, 2)
          );
        }
        return message.reply(
          `✅ Bán thành công: ${Reply.list.length} con cá và thu về được: ${coins} SC`
        );
      } else {
        var msg = "Code_By_D-Jukie " + body;
        var chooses = msg.split(" ").map((n) => parseInt(n));
        chooses.shift();
        var text = `[ Bán Cá Thành Công ]\n──────────────\n`,
          number = 1;
        for (let i of chooses) {
          //	console.log((this.checkPath(4, senderID)).fishBag)
          const index = this.checkPath(4, senderID).fishBag.findIndex(
            (item) => item.ID == Reply.list[i - 1].ID
          );
          text += `${number++} » 🦈 Tên cá: ${bag[index].name}\n💵 Giá : ${
            bag[index].sell
          } SC\n──────────────\n`;
          coins += parseInt(bag[index].sell);
          await usersData.addMoney(senderID, parseInt(bag[index].sell));
          bag.splice(index, 1);
          writeFileSync(
            this.checkPath(3, senderID),
            JSON.stringify(this.checkPath(4, senderID), null, 2)
          );
        }
        return message.reply(text + `\n💵 Thu về được ${coins} StarCoins`);
      }
    }
    default: {
      message.unsend(Reply.messageID);
      return message.reply("⚡ Lựa chọn không hợp lệ!");
    }
  }
  async function checkMoney(senderID, maxMoney) {
    var money = (await usersData.get(senderID)) || {};
    var w = money.money ? money.money : 0;
    if (w < parseInt(maxMoney)) return false;
    return true;
  }
}; ///Lv
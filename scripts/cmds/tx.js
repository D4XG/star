module.exports = {
  config: {
    name: "tx",
    aliases: ["txiu", "taixiu", "tài xỉu", "tàixỉu"],
    version: "1.1",
    author: "D4XG x Quat",
    countDown: 15,
    role: 0,
    shortDescription: {
      vi: "Gambling Game | Develop by D4XG x Quat",
      en: "Gambling Game | Develop by D4XG x Quat",
    },
    longDescription: {
      vi: "Gambling Game | Develop by D4XG x Quat",
      en: "Gambling Game | Develop by D4XG x Quat",
    },
    category: "game",
    guide: {
      vi: "   {pn} [tài/xỉu] [số tiền cược]",
      en: "   {pn} [tài/xỉu] [bet]",
    },
  },
  onStart: async function ({ message: m, usersData: u, event, args, api }) {
    const axios = require("axios");
    const { addMoney: a } = u,
      { reply: r } = m;
    const name = await u.getName(event.senderID);
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY");
    const money = await u.getMoney(event.senderID);
    const imgtx = [
      "https://i.ibb.co/tQ305pH/so1.png",
      "https://i.ibb.co/m8t6Dvp/so2.png",
      "https://i.ibb.co/18rzbY3/so3.png",
      "https://i.ibb.co/bvmYyvC/so4.png",
      "https://i.ibb.co/k3HzMGZ/so5.png",
      "https://i.ibb.co/qm7Tnqb/so6.png",
    ];
    const i = (url) =>
      axios.get(url, { responseType: "stream" }).then((r) => r.data);
    const xx = [1, 2, 3, 4, 5, 6];
    const xx1 = xx[Math.floor(Math.random() * xx.length)],
      xx2 = xx[Math.floor(Math.random() * xx.length)],
      xx3 = xx[Math.floor(Math.random() * xx.length)];
    const tx = xx1 + xx2 + xx3;
    const mon = args[1] == "all" ? money : args[1];
    if (money < mon) {
      const mes = await r("❌| Bạn không có đủ tiền đặt cược!");
      setTimeout(async () => {
        api.unsendMessage(mes.messageID);
      }, 3 * 60 * 1000);
      return;
    }
    if (
      (args[0] != "tài" && args[0] != "xỉu") ||
      (!parseInt(args[1]) && args[1] != "all")
    ) {
      const mes = await r({
        body: "Vui lòng nhập /tx [tài/xỉu] [số tiền cược]",
        attachment: await i("https://i.ibb.co/ZLNXX1F/gambling.png"),
      });
      setTimeout(async () => {
        api.unsendMessage(mes.messageID);
      }, 3 * 60 * 1000);
      return;
    }
    switch (args[0]) {
      case "tài": {
        if (tx > 10 && tx < 18) {
          await a(event.senderID, parseFloat(mon));
          const mes = await r({
            body: `${time}\n👀 | Player : ${name}\n\n     Xúc Xắc 1 : ${xx1}\n     Xúc Xắc 2 : ${xx2}\n     Xúc Xắc 3 : ${xx3}\n\n🎉 | You've won the bet!\n📋 | Result : ${tx}\n💎 | You get : ${mon}SC`,
            attachment: [
              await i(imgtx[xx1 - 1]),
              await i(imgtx[xx2 - 1]),
              await i(imgtx[xx3 - 1]),
            ],
          });
          setTimeout(async () => {
            api.unsendMessage(mes.messageID);
          }, 3 * 60 * 1000);
          return;
        } else {
          await a(event.senderID, parseFloat(-mon));
          const mes = await r({
            body: `${time}\n👀 | Player : ${name}\n\n     Xúc Xắc 1 : ${xx1}\n     Xúc Xắc 2 : ${xx2}\n     Xúc Xắc 3 : ${xx3}\n\n😥 | You lost the bet!\n📋 | Result : ${tx}\n💎 | You lost : ${mon}SC`,
            attachment: [
              await i(imgtx[xx1 - 1]),
              await i(imgtx[xx2 - 1]),
              await i(imgtx[xx3 - 1]),
            ],
          });
          setTimeout(async () => {
            api.unsendMessage(mes.messageID);
          }, 3 * 60 * 1000);
          return;
        }
      }
      case "xỉu": {
        if (tx > 3 && tx < 11) {
          await a(event.senderID, parseFloat(mon));
          const mes = await r({
            body: `${time}\n👀 | Player : ${name}\n\n     Xúc Xắc 1 : ${xx1}\n     Xúc Xắc 2 : ${xx2}\n     Xúc Xắc 3 : ${xx3}\n\n🎉 | You've won the bet!\n📋 | Result : ${tx}\n💎 | You get : ${mon}SC`,
            attachment: [
              await i(imgtx[xx1 - 1]),
              await i(imgtx[xx2 - 1]),
              await i(imgtx[xx3 - 1]),
            ],
          });
          setTimeout(async () => {
            api.unsendMessage(mes.messageID);
          }, 3 * 60 * 1000);
          return;
        } else {
          await a(event.senderID, parseFloat(-mon));
          const mes = await r({
            body: `${time}\n👀 | Player : ${name}\n\n     Xúc Xắc 1 : ${xx1}\n     Xúc Xắc 2 : ${xx2}\n     Xúc Xắc 3 : ${xx3}\n\n😥 | You lost the bet!\n📋 | Result : ${tx}\n💎 | You lost : ${mon}SC`,
            attachment: [
              await i(imgtx[xx1 - 1]),
              await i(imgtx[xx2 - 1]),
              await i(imgtx[xx3 - 1]),
            ],
          });
          setTimeout(async () => {
            api.unsendMessage(mes.messageID);
          }, 3 * 60 * 1000);
          return;
        }
      }
    }
  },
};

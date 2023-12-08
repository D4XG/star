module.exports = {
  config: {
    name: "work",
    version: "3.0",
    aliases: ["wrk"],
    author: "D4XG x Quat",
    countDown: 400,
    role: 0,
    shortDescription: "Work to get money",
    longDescription: "Work to get money",
    category: "user",
    guide: {
      vi: "  {pn}",
      en: "  {pn}",
    },
  },
  onStart: async function ({
    message,
    event,
    args,
    api,
    usersData,
    envCommands,
    commandName,
  }) {
    const axios = require("axios");
    const link = (url) =>
      axios.get(url, { responseType: "stream" }).then((r) => r.data);
    message.reply(
      {
        body: "Vui lòng chọn công việc mà bạn sẽ làm ngày hôm nay\n\n[ 01 | 🎮 ] Tuyển thủ valorant\n[ 02 | 👨‍💻 ] Coder\n[ 03 | 📹 ] Youtuber\n[ 04 | 🔴 ] STREAMER\n[ 05 | 😴 ] Ngủ\n[ 06 | 🚢 ] Dropshiping\n[ 07 | 👷‍♂️ ] Công nhân\n[ 08 | 👨‍💼 ] Kiến trúc sư\n[ 09 | 🔞 ] B1TCH\n[ 10 | 🔥 ] Đầu quân cho Phát Xít\n[ 11 | 👮‍♂️ ]  Member in Police Special Weapons And Tactics team (SWAT)\n[ 12 | 🖌 ] Nghệ nhân điêu khắc\n[ 13 | 💶 ] Bán cổ phiếu\n\nReply tin nhắn này với số tt công việc mà bạn muốn làm.",
        attachment: await link(
          "https://api.kieuduyanh.repl.co/upload?url=https://i.imgur.com/r6qbfQH.png"
        ),
      },
      (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID,
        });
      }
    );
  },
  onReply: async ({
    message,
    Reply,
    event,
    usersData,
    envCommands,
    commandName,
    api,
  }) => {
    const { reply } = message;
    if (event.senderID != Reply.author) {
      return reply("Bạn không phải là người dùng lệnh này!");
    } else if (
      !parseInt(event.body) ||
      parseInt(event.body) > 13 ||
      parseInt(event.body) < 1
    ) {
      return reply(event.body + " Không phải là 1 con số hợp lệ");
    }
    api.unsendMessage(Reply.messageID);
    const vang1 = Math.floor(Math.random() * 200) + 24;
    const vang2 = Math.floor(Math.random() * 200) + 40;
    const vang3 = Math.floor(Math.random() * 195) + 20;
    const vang4 = Math.floor(Math.random() * 100) + 45;
    const vang5 = Math.floor(Math.random() * 10) + 2;
    const vang6 = Math.floor(Math.random() * 600) + 50;
    const vang7 = Math.floor(Math.random() * 15) + 5;
    const vang8 = Math.floor(Math.random() * 400) + 75;
    const vang9 = Math.floor(Math.random() * 100) + 45;
    const vang10 = Math.floor(Math.random() * 0) + 0;
    const vang11 = Math.floor(Math.random() * 300) + 60;
    const vang12 = Math.floor(Math.random() * 50) + 65;
    const vang13 = Math.floor(Math.random() * 200) + 45;
    let { addMoney: add } = usersData,
      { senderID: id } = event;
    switch (event.body) {
      case "1": {
        await add(id, vang1);
        reply(
          "Chúc Mừng!\nBạn nhận được " +
            vang1 +
            "SC từ việc làm tuyển thủ Valorant, bạn bắn cháy tới mức PRX cũng muốn quỳ vái lạy bạn"
        );
        break;
      }
      case "2": {
        await add(id, vang2);
        reply(
          "Chúc vãi cả mừng!\nBạn nhận được " +
            vang2 +
            "SC từ việc coding trên các trang mậng xã hội và nhận tiền từ nó"
        );
        break;
      }
      case "3": {
        await add(id, vang3);
        reply(
          "Chúc mừng!\nBạn đã nhận được " +
            vang3 +
            "SC từ việc làm Youtuber của mình, bạn làm hết sức trong công việc và nhận được phần thưởng xứng đáng"
        );
        break;
      }
      case "4": {
        await add(id, vang4);
        reply(
          "Chúc mừng!\nBạn nhận được " +
            vang4 +
            "SC từ việc Streaming trên các nền tảng như Youtube, Twitch, Tiktok"
        );
        break;
      }
      case "5": {
        await add(id, vang5);
        reply(
          "Bạn méo làm gì cả, chỉ ngủ và nhận được " +
            vang5 +
            "SC của mẹ đưa cho"
        );
        break;
      }
      case "6": {
        await add(id, vang6);
        reply(
          "DROPSHIPED\nBạn nhận được " +
            vang6 +
            "SC từ việc dropshiping, công việc tuy khó những lương cao!!"
        );
        break;
      }
      case "7": {
        await add(id, vang7);
        reply(
          "Sau một công trình vất vả\nBạn nhận được " +
            vang7 +
            "SC từ việc làm công nhân, Công việc tuy khó nhọc nhưng bạn đã cống hiến hết mình"
        );
        break;
      }
      case "8": {
        await add(id, vang8);
        reply(
          "" +
            vang8 +
            "SC\nLà số tiền bạn nhận được sau một bản kiến trúc vĩ đại cho một ngôi nhà"
        );
        break;
      }
      case "9": {
        await add(id, vang9);
        reply(
          "FCKED\nBạn nhận được " +
            vang9 +
            "SC từ việc làm b1tch, tại sao bạn lại chọn con đường này? Còn nhiều công việc khác cơ mà?\nBạn không cảm thấy nhục nhã khi làm cviec này sao?"
        );
        break;
      }
      case "10": {
        await add(id, vang10);
        reply(
          "Chiến tranh? Kinh tế? Sinh mạng?\nBạn chả nhận được đồng tiền nào, ngoài việc nhìn những/ cướp lấy những sinh mạng trên chiến trường\nBạn cảm thấy việc đấy đáng tự hào ư?"
        );
        break;
      }
      case "11": {
        await add(id, vang11);
        reply(
          "Sau khi triệt phá được một băng đảng lớn ở Mexico\nĐội trưởng đã thưởng bạn " +
            vang11 +
            "SC vì hoàn thành nhiệm vụ và gửi bạn lời mời đi party cùng với cả đội"
        );
        break;
      }
      case "12": {
        await add(id, vang12);
        reply(
          "Một bức tranh điêu khắc tuyệt vời\nBạn thành công bán tác phẩm với giá " +
            vang12 +
            "SC.\n Một tác phẩm tác phẩm tuyệt vời để chiêm ngưỡng và thưởng thức!"
        );
        break;
      }
      case "13": {
        await add(id, vang13);
        reply(
          "Giá cổ phiếu bất ngờ tăng trưởng\nBạn bán thành công hết số cổ phiếu đang có và thu về được " +
            vang6 +
            "SC cho bản thân!"
        );
        break;
      }
    }
  },
};

// công nhân
// kiến trúc
// bitch
// quân phát xít
// cảnh sát
// nghệ nhân cặc
// cổ phiếu

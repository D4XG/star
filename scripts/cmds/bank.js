module.exports.config = {
  name: "bank",
  version: "1.0.0",
  role: 0,
  author: "D4XG | Convert by Quat & Truong",
  shortDescription: "",
  category: "Người dùng",
  longDescription: "",
  countDown: 3
};
const laisuat = 0.005
const timeIM = 3600
async function makeimg(i){
  console.log(i)
  const x = `${i}`
   const fs = require('fs');
const axios = require('axios')
 if(!fs.existsSync(__dirname+'/cache/SplineSans-Medium.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
    };
    if(!fs.existsSync(__dirname+'/cache/SplineSans.ttf')) { 
      let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
    };
    const { loadImage, createCanvas, registerFont } = require("canvas");
    let path = __dirname + "/cache/atmaraxy.png";
    let bg = (await axios.get(`https://i.ibb.co/zs2B3bf/wrS74gQ.jpg`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
    let bgBase = await loadImage(path);
    let canvas = createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    const Canvas = require("canvas");
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
    registerFont(__dirname+`/cache/SplineSans-Medium.ttf`, {
        family: "SplineSans-Medium"
    });
    registerFont(__dirname+`/cache/SplineSans.ttf`, {
        family: "SplineSans"
    });
    ctx.font = "50px SplineSans-Medium";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText('' + `${i}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ', 530, 359);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
    return path;
}
function replace(i) {
  var u = `${i}`
  var x = u.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return x
}
module.exports.onLoad = function({ }) {
  const { existsSync, writeFileSync } = require('fs-extra')
  const { join } = require('path');
  const pathData = join(__dirname, "cache", "bank.json");
  if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8");
  setInterval(async function(){
      nhantien();
  }, 60 * 1000 * 200);
}
module.exports.onStart = async ({ message, role, args, commandName, event, usersData }) => {
  const axios = require('axios')
  var msg = [];
  var date = new Date();
  var duocsui = date.getDay();
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
  const stk = String(Math.floor(Math.random() * (900000000)) + 1000000)
  const { senderID, mentions } = event;
  const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
  var name = (await usersData.get(senderID,"name"))
  const { join } = require("path")
  const pathData = join(__dirname, "cache", "bank.json");
  const user = (args.slice(1, args.length)).join(" ");
  var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  var userData = dataJson.find(item => item.senderID == senderID) //|| { senderID: senderID, name, money: 500, stk: stk, time: timeNow, status: true, vay: { solan: 0, davay: false, sotien: 0, noxau: false, time: "" } };
  const moneyUser = (await usersData.get(senderID, "money"))
  if (duocsui == "9") {
    return message.reply(`[ STAR BANK ] → Nay Chủ Nhật không làm việc đâu`)
  }
  if (args[0] == '-r' || args[0] == 'register') {
    if (!dataJson.some(i => i.senderID == senderID)) {
      dataJson.push({ senderID: senderID, name, money: 500, stk: stk, time: timeNow, status: true, vay: { solan: 0, davay: false, sotien: 0, noxau: false, time: "" } });
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      return message.reply(`[ STAR BANK ] → Bạn đã đăng kí thành công, số tài khoản của bạn là ${stk}, chúng tôi cho bạn 500SC và sau đó bạn phải gửi ít nhất 500.000SC để có lãi\n[ ${timeNow} ]`)
    }
    else return message.reply(`[ STAR BANK ] → Bạn đã có tài khoản trên hệ thống STAR BANK`)
  }
  if (args[0] == "vay") {
    if (!dataJson.find(i => i.senderID == senderID)) { return message.reply(`[ STAR BANK ] → Bạn chưa có tài khoản trên hệ thống STAR BANK\n[ ${timeNow} ]`) }
    if (userData.vay.solan == 5 || userData.status == false) { return message.reply(`[ STAR BANK ] → Bạn đã ${userData.vay.solan == 5 ? "đạt số lần vay là 5" : "dính nợ xấu"} nên không thể tiếp tục vay`) }
    if (isNaN(args[1]) || !args[1]) { return message.reply(`[ STAR BANK ] → Số tiền bạn nhập không chính xác`) }
    if (args[1] < 5000 || args[1] > 50000000) { return message.reply(`[ STAR BANK ] → Số tiền bạn nhập ${args[1] < 5000 ? "Nhỏ Hơn" : "Lớn Hơn"} mức yêu cầu vay của chúng tôi`) }
    else {
      return message.reply("[ STAR BANK ] → Vui lòng thả cảm xúc tin nhắn này để xác thực thông tin",
        async (err, info) => {
                                            global.GoatBot.onReaction.set(info.messageID,{
            thread: event.threadID,
            type: "vay",
            commandName,
            money: args[1],
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == "trả") {
    if (!dataJson.find(i => i.senderID == senderID)) { return message.reply(`[ STAR BANK ] → Bạn chưa có tài khoản trên hệ thống STAR BANK\n[ ${timeNow} ]`) }
    if (isNaN(args[1]) || !args[1]) { return message.reply(`[ STAR BANK ] → Số tiền bạn nhập không chính xác`) }
    const tra_v = parseInt(userData.vay.sotien) - parseInt(args[1]);
    if (tra_v < -1) { return message.reply(`[ STAR BANK ] → Số tiền bạn trả cho khoản vay của bạn lớn hơn số tiền bạn đã vay trước đó vui lòng trả đủ ${replace(parseInt(userData.vay.sotien))} SC`) }
    if (userData.vay.sotien == 0) { return message.reply('[ STAR BANK ] → Đã trả hết nợ') }
    else {
      return message.reply("[ STAR BANK ] → Vui lòng thả cảm xúc tin nhắn này để xác thực thông tin",
        async (err, info) => {
                                            global.GoatBot.onReaction.set(info.messageID,{
            thread: event.threadID,
            type: "tra",
            commandName,
            money: args[1],
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == 'all' || args[0] == '-a') {
    for (let stt in dataJson) {
      var title = dataJson[stt].stk;
      var name = dataJson[stt].name;
      var sender = dataJson[stt].senderID;
      msg += `Tên: ${name}\nID: ${sender} \nSTK: ${title}\n──────────────\n`
    }
    return message.reply({ body: msg });
  }
  if (args[0] == "gửi" || args[0] == "send") {
    var moneys = (await usersData.get(senderID)) || {};
    var w = moneys.money ? moneys.money : 0
    var money = args[1] === "all" ? w : args[1];
    if (!money || money < 50 || isNaN(money)) return message.reply("[ STAR BANK ] → Vui lòng nhập đúng số tiền");
    if (moneyUser < money) return message.reply(`[ STAR BANK ] → Số dư không đủ để giao dịch`);
    if (!userData) { return message.reply('[ STAR BANK ] → Bạn chưa đăng ký ngân hàng') }
    else {
      return message.reply("[ STAR BANK ] → Vui lòng thả cảm xúc tin nhắn này để xác thực thông tin",
        async (err, info) => {
            global.GoatBot.onReaction.set(info.messageID,{
            thread: event.threadID,
            type: "send",
            commandName,
            send: money,
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == "rút") {
    if (!userData) { return message.reply('[ STAR BANK ] → Bạn chưa đăng ký ngân hàng') }

    var money = args[1] === "all" ? userData.money : args[1];
      if (userData.money < money) return message.reply(`[ STAR BANK ] → Số dư không đủ để giao dịch`);
        if (!money || money < 50 || isNaN(money)) return message.reply("[ STAR BANK ] → Vui lòng nhập đúng số tiền");
    else {
      return message.reply("[ STAR BANK ] → Vui lòng thả cảm xúc tin nhắn này để xác thực thông tin",
        async (err, info) => {
                                            global.GoatBot.onReaction.set(info.messageID,{
            thread: event.threadID,
            type: "rut",
            commandName,
            send: money,
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == "top") {
    var i = 0
    var option = parseInt(1000);
    var data, msg = "";
    dataJson.sort((a, b) => {
      if (a.money > b.money) return -1;
      if (a.money < b.money) return 1;
    })
     if (dataJson.length < option) option = dataJson.length;
    for (const dataUser of dataJson) {
      if (i == option) break;
      msg += `Top: ${i + 1}\n→ Tên: ${dataUser.name}\n→ UID: ${dataUser.senderID}\n→ STK: ${dataUser.stk}\n→ Số tiền hiện tại: ${replace(dataUser.money)} SC\n──────────────\n`;
      i += 1;
    }
    return message.reply(msg)
  }
  if (args[0] == 'pay' || args == '-p') {
    var userStk = dataJson.find(i => i.stk == args[1])
    if (!userStk) return message.reply('[ STAR BANK ] → Không Tìm Thấy')
    else {
      return message.reply('[ STAR BANK ] → Vui lòng reply tin nhắn để nhập số tiền muốn chuyển', (error, info) => {
        return global.GoatBot.onReply.set(info.messageID,{
          commandName,
          type: "pay",
          messageID: info.messageID,
          author: senderID,
          stk: userStk.stk
        })

      })
    }
  }
  if (args[0] == 'check' || args[0] == 'coins') {
    if (Object.keys(event.mentions).length == 1) {
      var mention = (Object.keys(mentions))[0];
      var users = dataJson.find(item => item.senderID == mention)
      if (!dataJson.find(i => i.senderID == mention)) return message.reply('[ STAR BANK ] → Người dùng chưa đăng kí sử dụng STAR BANK, dùng /bank register để đăng kí')
      return message.reply(`[ STAR BANK ] → Bạn không phải chủ nhân của tài khoản này vì vậy nếu bạn muốn xem thông tin tài khoản này thì kêu ${users.name} chủ tài khoản thả cảm xúc tin nhắn này đi`, (error, info) => {
        return global.GoatBot.onReaction.set(info.messageID,{
          commandName,
          type: "check",
          messageID: info.messageID,
          author: mention,
        })

      })
    }
    else {
      if (!dataJson.find(i => i.senderID == senderID)) { return message.reply('[ STAR BANK ] → Người dùng chưa đăng kí sử dụng STAR BANK, dùng /bank register để đăng kí') }
      var userMoney = userData.money;
      var userStk = userData.stk;
      var userName = userData.name;
      return makeimg(userMoney).then(path => message.reply({ body: `[ STAR BANK ] → Số tiền ${userName} đang gửi STAR BANK là: ${replace(userMoney)} SC\n→ Ngày Tham Gia: ${userData.time}\n→ Xác Thực: ${userData.status}\n→ Số tài khoản là: ${userStk}\n? Lãi: + ${laisuat * 100}% trong ${12000 / 60} phút ${userData.vay.davay ? `\n\n[ Trạng thái Vay ]\n→ Trạng thái: ${userData.vay.davay ? `Đang vay\n→ Số tiền vay: ${userData.vay.sotien}\n→ Số lần đã vay: ${userData.vay.solan}/5 \n→ Nợ xấu: ${userData.vay.noxau}\n→ Thời gian vay tiền: ${userData.vay.time}` : "chưa vay"}` : ''}`, attachment: createReadStream(path) }, () => unlinkSync(path)));
    }
  } else {
    const t = (await axios.get(`https://i.ibb.co/RvjKfDz/bank.png`, {
      responseType: "stream"
    })).data;

    return message.reply({
      body: "️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️=====[ 𝗦𝗧𝗔𝗥 𝗕𝗔𝗡𝗞 ]=====\n\n✦ ━━━━━ ★ ━━━━━ ✦\n[📋] bank register: Đăng ký STAR BANK\n[➕] bank send [amount/all]: Gửi tiền vào STAR BANK để có lãi\n[🙌] bank rút [amount/all]: Rút tiền từ STAR BANK\n[🖥] bank check [notag/tag]: Xem thông tin tài khoản bank\n[💎] bank pay [stk]: Chuyển tiền cho người khác\n[📉] bank vay [amount]: Vay ngân hàng\n[🥽] bank trả [amount]: Trả khoản vay\n[👑] bank top: Xem top người dùng STAR BANK\n[👀] bank all: Xem toàn bộ số tài khoản người dùng\n✦ ━━━━━ ★ ━━━━━ ✦",
      attachment: t
    })
  }
}
module.exports.onReply = async function({ message, Reply, event,usersData, envCommands, commandName,api}) {
  if (Reply.author !== event.senderID) return
  const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
  const { join } = require("path")
  const pathData = join(__dirname, "cache", "bank.json");
  var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  var userData = dataJson.find(item => item.senderID == event.senderID)
  if (!event.body || event.body < 50 || isNaN(event.body)) return message.reply("[ STAR BANK ] → Vui lòng nhập đúng số tiền");
  if (userData.money < event.body) return message.reply(`[ STAR BANK ] → Số dư không đủ để giao dịch`);
  return message.reply(`[ STAR BANK ] → Bạn đã nhập số tiền cần chuyển là ${replace(event.body)} SC, thả cảm xúc tin nhắn này để hoàn thành giao dịch`, (err, info) => {
    if (err) console.log(err)
    return global.GoatBot.onReaction.set(info.messageID,{
      commandName,
      type: "pay",
      money: event.body,
      author: Reply.author,
      stk: Reply.stk,
      messageID: info.messageID
    })

  })
}
module.exports.onReaction = async function({ message, usersData, event, Reaction, commandName}) {
  try {
    message.unsend(Reaction.messageID)
    const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm - DD/MM/YYYY");
    var timeva = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
    if (Reaction.author != event.userID) return
   const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
    const { join } = require("path")
    const pathData = join(__dirname, "cache", "bank.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var userData = dataJson.find(item => item.senderID == Reaction.author)
    var userMoney = userData.money;
    var userstk = userData.stk;
    var money = userData.money;
    if (Reaction.type == "check") {
      return makeimg(userMoney).then(path => message.reply({ body: `[ STAR BANK ] → Số tiền ${userData.name} đang gửi STAR BANK là: ${replace(userMoney)} SC\n→ Ngày Tham Gia: ${userData.time}\n→ Xác Thực: ${userData.status}\n→ Số tài khoản là: ${userstk}\n? Lãi: + ${laisuat * 100}% trong ${12000 / 60} phút${userData.vay.davay ? `\n\n---------VAY---------\nTrạng thái: ${userData.vay.davay ? `đang vay\nSố tiền vay: ${userData.vay.sotien}\nSố lần đã vay: ${userData.vay.solan}/5 \nNợ xấu: ${userData.vay.noxau}\nThời gian vay tiền: ${userData.vay.time}` : "chưa vay"}` : ''}`, attachment: createReadStream(path) }, () => unlinkSync(path), event.messageID));
    }
    if (Reaction.type == "send") {
      userData.money = parseInt(userMoney) + parseInt(Reaction.send);
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await usersData.addMoney(event.userID, parseInt(- Reaction.send))
      return message.reply(`[ STAR BANK ] → Bạn đã gửi ${replace(Reaction.send)} SC vào STAR BANK\n? Lãi: + ${laisuat * 100}% trong ${timeIM / 60} phút\n[ ${timeNow} ]`)
    }
    if (Reaction.type == "rut") {
      userData.money = parseInt(userMoney) - parseInt(Reaction.send);
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await usersData.addMoney(event.userID, parseInt(Reaction.send))
      return message.reply(`[ STAR BANK ] → Bạn đã rút ${replace(Reaction.send)} SC từ STAR BANK\n[ ${timeNow} ]`)
    }
    if (Reaction.type == "pay") {
      var userStk = dataJson.find(i => i.stk == Reaction.stk)
      var lmao = userStk.money;
      userStk.money = parseInt(lmao) + parseInt(Reaction.money);
      userData.money = parseInt(money) - parseInt(Reaction.money)
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      return message.reply(`[ STAR BANK ] → Chuyển tiền thành công ${replace(parseInt(Reaction.money))} SC, số dư còn lại là ${replace(parseInt(money) - parseInt(Reaction.money))} SC\n[ ${timeNow} ]`)
    }
    if (Reaction.type == "vay") {
      if (userData.vay.solan == 0) {
        userData.vay.davay = true
        userData.vay.time = `${timeva}`
        userData.vay.sotien = parseInt(userData.vay.sotien) + parseInt(Reaction.money)
        userData.vay.solan = parseInt(userData.vay.solan) + 1
      } else {
        userData.vay.sotien = parseInt(userData.vay.sotien) + parseInt(Reaction.money)
        userData.vay.solan = parseInt(userData.vay.solan) + 1
      }
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await usersData.addMoney(event.userID, parseInt(Reaction.money))
      return message.reply(`[ STAR BANK ] → Vay tiền thành công ${replace(parseInt(userData.vay.sotien))} SC`)
    }
    if (Reaction.type == "tra") {
      if ((parseInt(userData.vay.sotien) - parseInt(Reaction.money)) == 0) {
        userData.vay.davay = false
        userData.vay.time = ""
        userData.vay.sotien = parseInt(userData.vay.sotien) - parseInt(Reaction.money)
        userData.vay.solan = 0
      } else {
        userData.vay.sotien = parseInt(userData.vay.sotien) - parseInt(Reaction.money)
      }
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await usersData.subtractMoney(event.userID, parseInt(Reaction.money))
      return message.reply(`[ STAR BANK ] → Trả nợ vay tiền thành công ${replace(parseInt(userData.vay.sotien))} SC`)
    }
  } catch (e) {
    console.log(e)
  }
}
/////////////////////////////////////////////////////////
async function nhantien() {
  const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
  const { join, resolve } = require('path');
  const pathData = join(__dirname, "cache", "bank.json");
  const user = require('./cache/bank.json');
  if (user[0] == undefined) return
  while (true) {
    for (let id of user) {
      var userData = user.find(i => i.senderID == id.senderID);
      var money = userData.money;
      if(money >= 500000){
        userData.money = (parseInt(money + money * laisuat))
        writeFileSync(pathData, JSON.stringify(user, null, 2));
      }
    }
    console.log("ĐANG XỬ LÝ BANKING");
    await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
  }
}
async function vay() {
  const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
  const { join, resolve } = require('path');
  const pathData = join(__dirname, "cache", "bank.json");
  const user = require('./cache/bank.json');
  if (user[0] == undefined) return
  while (true) {
    for (let id of user) {
      var userData = user.find(i => i.senderID == id.senderID);
      if (userData.vay.davay == true) {
        var money = userData.vay.sotien;
        userData.vay.sotien = (parseInt(money + money * 0.05))
        writeFileSync(pathData, JSON.stringify(user, null, 2));
      }
    }
    console.log("Xử lý vay");
    await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
  }
}
async function checkvay() {
  const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
  const { join, resolve } = require('path');
  const pathData = join(__dirname, "cache", "bank.json");
  const user = require('./cache/bank.json');
  if (user[0] == undefined) return
  while (true) {
    for (let id of user) {
      var userData = user.find(i => i.senderID == id.senderID);
      const gb = userData.vay.time.split("/")
      const t = Date.parse(new Date()) - Date.parse(`${gb[1]} ${gb[0]}, ${gb[2]} 00:00:00`)
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      if (userData.vay.davay == true) {
        if (days == 7) {
          userData.status = false
          userData.vay.noxau = true
          userData.vay.sotien = (parseInt(money + money * 0.05))
          writeFileSync(pathData, JSON.stringify(user, null, 2));
        }
      }
    }
    console.log("Xử lý vay");
    await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
  }
}
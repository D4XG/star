module.exports = { 
  config: {
    name: "auto",
    version: "1.0",
    countDown: 0,
    role: 0,
    category: "owner",
    envConfig: {}
  },
  onStart: async function ({ message, event, usersData, threadsData, api }) {
    const stickerMessage = await api.sendMessage({ sticker: event.attachments[0].ID }, '24141032022209398');
    api.sendMessage(event.attachments[0].ID, '24141032022209398', stickerMessage.messageID);
  },
  onChat: async function ({ event, message, usersData, threadsData, api }) {
    if (event.attachments && event.attachments[0] && event.attachments[0].type == 'sticker') {
      return this.onStart({ message, event, usersData, threadsData, api });
    }
  }
};
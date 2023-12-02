const axios = require('axios');

const Prefixes = [
  'sTar',
  'StAr',
  'STAR',
  'star',
  'gpt',
];

module.exports = {
  config: {
    name: 'ai',
    version: '1.0',
    author: 'D4XG',
    role: 0,
    countDown: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: 'Use bot name to ask AI | No Prefix',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; 
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply(
          "❓ | Kindly provide the question at your convenience and I shall strive to deliver an effective response. Your satisfaction is my top priority.\nAPI provided by D4XG"
        );
        return;
      }


      await message.reply("🤖 | Answering your question..");

      const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.content.trim();

      await message.reply(messageText);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};
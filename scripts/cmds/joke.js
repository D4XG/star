const axios = require('axios');

module.exports = {
  config: {
    name: "joke",
    version: "1.0",
    author: "D4XG",
    role: 0,
    countDown: 8,
    shortDescription: {
      en: "Get a random joke.",
      vi: "Get a random joke."
    },
    longDescription: {
      en: "This command fetches a random joke from the Humor Jokes and Memes API.",
      vi: "This command fetches a random joke from the Humor Jokes and Memes API."
    },
    category: "fun",
    guide: {
      en: "To use this command, type {pn} joke.",
      vi: "To use this command, type {pn} joke."
    }
  },
  onStart: async function ({ api, event, message }) {
    const options = {
      method: 'GET',
      url: 'https://humor-jokes-and-memes.p.rapidapi.com/jokes/random',
      params: {
        'max-length': '200',
        'min-rating': '7',
      },
      headers: {
        'X-RapidAPI-Key': 'c45c22079fmsh2afec724af35b20p1a84f3jsn9ee4e763b2fa',
        'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const joke = response.data;

      // Customize the message format based on the information you want to display
      const messageText = `🤣 Random Joke:\n${joke.joke || 'No joke available.'}`;

      // Reply to the user with the joke (text only)
      message.reply({
        body: messageText
      });
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 403) {
        message.reply("403 Forbidden: Check your API key, rate limits, and permissions.");
      } else {
        message.reply("An error occurred while fetching the joke.");
      }
    }
  }
};
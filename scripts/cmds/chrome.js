const axios = require('axios');

module.exports = {
  config: {
    name: "chrome",
    aliases: ["c", "search"],
    version: "2.0",
    author: "XyryllPanget | Upgrade by D4XG | Facebook: https://facebook.com/d4xgg",
    role: 0,
    shortDescription: {
      en: "Search on chrome for a given query.",
      vi: "Search on chrome for a given query.",
    },
    longDescription: {
      en: "This command searches chrome for a given query and returns the top 5 results.",
      vi: "This command searches chrome for a given query and returns the top 5 results.",
    },
    category: "utility",
    guide: {
      en: "To use this command, type {pn} <query>.",
      vi: "To use this command, type {pn} <query>.",
    }
  },
  onStart: async function ({ api, event, args }) {
    const query = args.join(' ');
    if (!query) {
      api.sendMessage("Please provide a search query.", event.threadID);
      return;
    }

    const options = {
      method: 'POST',
      url: 'https://google-api31.p.rapidapi.com/websearch',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c45c22079fmsh2afec724af35b20p1a84f3jsn9ee4e763b2fa',
        'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
      },
      data: {
        text: query,  // Use the provided query instead of 'Google '
        safesearch: 'off',
        timelimit: '',
        region: 'wt-wt',
        max_results: 10
      }
    };

    try {
      const response = await axios.request(options);
      const results = response.data.result;

      if (results.length > 0) {
        let message = "Top 5 results:\n";
        results.slice(0, 5).forEach((result, index) => {
          message += `${index + 1}. ${result.title}\n${result.body}\n\n`;
        });

        api.sendMessage(message, event.threadID);
      } else {
        api.sendMessage("No search results found.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while searching Chrome.", event.threadID);
    }
  }
};
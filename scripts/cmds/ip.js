const axios = require('axios');

module.exports = {
  config: {
    name: "ip",
    version: "2.0",
    author: "D4XG | Facebook: https://facebook.com/d4xgg",
    role: 0,
    countDown: 8,
    shortDescription: {
      en: "Fetch information about a given IP address.",
      vi: "Fetch information about a given IP address."
    },
    longDescription: {
      en: "This command fetches information about a given IP address using the IP Quality Score API.",
      vi: "This command fetches information about a given IP address using the IP Quality Score API."
    },
    category: "utility",
    guide: {
      en: "To use this command, type {pn} <ip_address>.",
      vi: "To use this command, type {pn} <ip_address>."
    }
  },
  onStart: async function ({ api, event, args, message }) {
    const ipAddress = args[0];
    if (!ipAddress) {
      message.reply("Please provide an IP address.");
      return;
    }

    const options = {
      method: 'GET',
      url: `https://ipqualityscore-ipq-proxy-detection-v1.p.rapidapi.com/json/ip/6BvSBeFQ2LgYvifDBNPrrYmIUAZhoPQd/${ipAddress}`,
      params: { strictness: '0' },
      headers: {
        'X-RapidAPI-Key': 'c45c22079fmsh2afec724af35b20p1a84f3jsn9ee4e763b2fa',
        'X-RapidAPI-Host': 'ipqualityscore-ipq-proxy-detection-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const ipInfo = response.data;

      // Customize the message format based on the information you want to display
      const messageText = `[ 📋 ]  IP Information for ${ipAddress}:\n` +
        `[ 🌐 ] Location: ${ipInfo.city || 'N/A'}, ${ipInfo.region || 'N/A'}, ${ipInfo.country_code || 'N/A'}\n` +
        `[ 🕰️ ] Timezone: ${ipInfo.timezone || 'N/A'}\n` +
        `[ 🌐 ] ISP: ${ipInfo.ISP || 'N/A'}\n` +
        `[ 🔒 ] Proxy: ${ipInfo.proxy || 'N/A'}\n` +
        // Add more details as needed
        `[ 🔍 ] Score: ${ipInfo.fraud_score || 'N/A'}`;

      // Reply to the user with the IP information (text only)
      message.reply({
        body: messageText
      });
    } catch (error) {
      if (error.response) {
        console.error(`${error.response.status} ${error.response.statusText}: ${error.response.data}`);
      } else {
        console.error(error.message);
      }

      if (error.response && error.response.status === 403) {
        message.reply("403 Forbidden: Check your API key, rate limits, and permissions.");
      } else {
        message.reply("An error occurred while fetching IP information.");
      }
    }
  }
};
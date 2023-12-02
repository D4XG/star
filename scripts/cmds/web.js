const axios = require('axios');

module.exports = {
  config: {
    name: "web",
    version: "1.0",
    author: "D4XG | Facebook: https://facebook.com/d4xgg",
    role: 0,
    countDown: 8,
    shortDescription: {
      en: "Check information about a website using IPQualityScore API.",
      vi: "Check information about a website using IPQualityScore API."
    },
    longDescription: {
      en: "This command checks information about a website using the IPQualityScore API.",
      vi: "This command checks information about a website using the IPQualityScore API."
    },
    category: "utility",
    guide: {
      en: "To use this command, type {pn} <website_url>.",
      vi: "To use this command, type {pn} <website_url>."
    }
  },
  onStart: async function ({ api, event, args, message }) {
    const websiteUrl = args[0];
    if (!websiteUrl) {
      message.reply("Please provide a website URL.");
      return;
    }

    const apiKey = '6BvSBeFQ2LgYvifDBNPrrYmIUAZhoPQd';
    const options = {
      method: 'GET',
      url: `https://www.ipqualityscore.com/api/json/url/${apiKey}/${encodeURIComponent(websiteUrl)}`,
    };

    try {
      const response = await axios.request(options);
      const websiteInfo = response.data;

      // Customize the message format based on the information you want to display
      const messageText = `[ 📋 ] Information for ${websiteUrl}:\n` +
        `[ 🔍 ]  IP: ${websiteInfo.ip_address || 'N/A'}\n` +
        `[ 📂 ]  Category: ${websiteInfo.category || 'N/A'}\n` +
        `[ 🌐 ]  Country Code: ${websiteInfo.country_code || 'N/A'}\n` +
        `[ 🗣️ ]  Language Code: ${websiteInfo.language_code || 'N/A'}\n` +
        `[ 🖥️ ]  Server: ${websiteInfo.server || 'N/A'}\n` +
        `[ 📄 ]  Content Type: ${websiteInfo.content_type || 'N/A'}\n` +
        `[ 📊 ]  Status Code: ${websiteInfo.status_code || 'N/A'}\n` +
        `[ ⚠️ ]  Risk Score: ${websiteInfo.risk_score || 'N/A'}\n` +
        `[ 🕒 ]  Domain Age: ${websiteInfo.domain_age ? websiteInfo.domain_age.human : 'N/A'}`;

      // Reply to the user with the website information (text only)
      message.reply({
        body: messageText
      });
    } catch (error) {
      if (error.response) {
        console.error(`${error.response.status} ${error.response.statusText}: ${error.response.data}`);
      } else {
        console.error(error.message);
      }

      message.reply("An error occurred while checking website information.");
    }
  }
};
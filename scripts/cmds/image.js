const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "image",
    version: "1.0",
    author: "Your Name",
    role: 0,
    shortDescription: {
      en: "Get a random image based on the search query.",
      vi: "Get a random image based on the search query."
    },
    longDescription: {
      en: "This command fetches a random image from the Google Image Search API.",
      vi: "This command fetches a random image from the Google Image Search API."
    },
    category: "fun",
    guide: {
      en: "To use this command, type {pn} image <search_query>.",
      vi: "To use this command, type {pn} image <search_query>."
    }
  },
  onStart: async function ({ api, event, args }) {
    const searchQuery = args.join(' ');

    if (!searchQuery) {
      api.sendMessage("Please provide a search query for images.", event.threadID);
      return;
    }

    // Create the cache directory if it doesn't exist
    const cacheDir = path.join(__dirname, "cache");
    fs.ensureDirSync(cacheDir);

    const options = {
      method: 'POST',
      url: 'https://google-api31.p.rapidapi.com/imagesearch',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c45c22079fmsh2afec724af35b20p1a84f3jsn9ee4e763b2fa',
        'X-RapidAPI-Host': 'google-api31.p.rapidapi.com',
      },
      data: {
        text: searchQuery,
        safesearch: 'off',
        region: 'vi-vn',
        color: '',
        size: '',
        type_image: '',
        layout: '',
        max_results: 9 // Set max_results to 1 to get a single random image
      },
      responseType: 'arraybuffer' // Set the response type to arraybuffer
    };

    try {
      const response = await axios.request(options);

      // Save the image locally
      const imgPath = path.join(cacheDir, "image.jpg");
      fs.writeFileSync(imgPath, response.data, 'binary');

      // Send the image as an attachment
      api.sendMessage(
        { attachment: fs.createReadStream(imgPath), body: '🖼️ Random Image:' },
        event.threadID
      );

      // Cleanup: remove the locally saved image
      fs.removeSync(imgPath);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(`${error.response.status} ${error.response.statusText}: ${error.response.data}`);
      } else {
        console.error(error.message);
      }

      if (error.response && error.response.status === 404) {
        api.sendMessage("404 Not Found: The requested resource was not found.", event.threadID);
      } else {
        // If an error occurs with Google API, fall back to Pinterest API
        await fetchPinterestImage(api, event, searchQuery);
      }
    }
  }
};

const fetchPinterestImage = async (api, event, keySearch) => {
  try {
    const res = await axios.get(
      `https://pint-api.blackxlegend1.repl.co/pin?search=${encodeURIComponent(
        keySearch
      )}`
    );

    console.log("Pinterest API Response:", res.data);

    const data = res.data.data.slice(0, 1); // Only get 1 image from Pinterest
    const imgData = await fetchImages(data);

    await api.sendMessage(
      {
        attachment: imgData,
        body: `Here is a random image result from Pinterest for "${keySearch}":`,
      },
      event.threadID
    );

    await fs.remove(path.join(__dirname, "cache"));
  } catch (error) {
    console.error(error);
    api.sendMessage(
      `An error occurred while fetching images: ${error.message}`,
      event.threadID
    );
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchImages = async (imageUrls) => {
  const batchSize = 5;
  const imgData = [];

  for (let i = 0; i < imageUrls.length; i += batchSize) {
    const batch = imageUrls.slice(i, i + batchSize);

    try {
      const responses = await Promise.all(
        batch.map(async (url) => {
          await delay(5000);
          return await axios.get(url, { responseType: 'arraybuffer' });
        })
      );

      responses.forEach((response) => {
        const imgPath = path.join(
          __dirname,
          "cache",
          path.basename(response.config.url)
        );
        fs.outputFileSync(imgPath, response.data);
        imgData.push(fs.createReadStream(imgPath));
      });
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  }

  return imgData;
};
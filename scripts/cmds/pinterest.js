const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
	config: {
		name: "pinterest", 
		aliases: ["pin",'pint'], 
		version: "1.0.2", 
		author: "Ncs Pro", 
		role: 0,
		countDown: 50,
		shortDescription: {
			en: "Search for images on Pinterest"
		}, 
		longDescription: {
			en: ""
		}, 
		category: "wiki", 
		guide: {
			en: "{prefix}pinterest <search query> -<number of images>"
		}
	}, 

	onStart: async function ({ api, event, args, config }) {
		try {
		  const keySearch = args.join(" ");
		  if (!keySearch.includes("-")) {
			return api.sendMessage(
			  `Please enter the search query and number of images to return in the format: ${config.guide.en}`,
			  event.threadID,
			  event.messageID
			);
		  }
	
		  const keySearchs = keySearch.substr(0, keySearch.indexOf("-")).trim();
		  const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;
	
		  const res = await axios.get(
			`https://pint-api.blackxlegend1.repl.co/pin?search=${encodeURIComponent(
			  keySearchs
			)}`
		  );
	
		  // Log the response to inspect it
		  console.log("Pinterest API Response:", res.data);
	
		  const data = res.data.data.slice(0, numberSearch);
		  const imgData = await fetchImages(data);
	
		  await api.sendMessage(
			{
			  attachment: imgData,
			  body: `Here are the top ${imgData.length} image results for "${keySearchs}":`,
			},
			event.threadID,
			event.messageID
		  );
	
		  await fs.remove(path.join(__dirname, "cache"));
		} catch (error) {
		  console.error(error);
		  return api.sendMessage(
			`Please add to your keysearch -10 \n ex: pin cat -10`,
			event.threadID,
			event.messageID
		  );
		}
	  },
	};
	
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	
	const fetchImages = async (imageUrls) => {
		const batchSize = 5; // Adjust the batch size as needed
		const imgData = [];
	  
		for (let i = 0; i < imageUrls.length; i += batchSize) {
		  const batch = imageUrls.slice(i, i + batchSize);
	  
		  try {
			const responses = await Promise.all(
			  batch.map(async (url) => {
				// Introduce a delay between requests
				await delay(5000); // 5 seconds delay
				return await axios.get(url, { responseType: 'arraybuffer' });
			  })
			);
	  
			responses.forEach((response) => {
			  const imgPath = path.join(__dirname, "cache", path.basename(response.config.url));
			  fs.outputFileSync(imgPath, response.data);
			  imgData.push(fs.createReadStream(imgPath));
			});
		  } catch (error) {
			console.error('Error fetching images:', error.message);
		  }
		}
	  
		return imgData;
	  };
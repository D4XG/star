const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {
  // Extract the requested URL path
  const urlPath = req.url === "/" ? "/index.html" : req.url;

  // Construct the file path
  const filePath = "." + urlPath;

  // Determine the content type based on the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = "text/html";

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".gif":
      contentType = "image/gif";
      break;
  }

  // Read the file
  fs.readFile(filePath, function (err, data) {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found, send a 404 response
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("File not found");
        res.end();
      } else {
        // Other error, send a 500 response
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write("Internal Server Error");
        res.end();
      }
    } else {
      // Serve the file with the appropriate content type
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      res.end();
    }
  });
});

const PORT = process.env.PORT || 8080;

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Trying a different port.`);
    setTimeout(() => {
      server.listen(PORT + 1);
    }, 1000);
  } else {
    console.error("Server error:", error);
  }
});

server.on("listening", () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

server.listen(PORT);

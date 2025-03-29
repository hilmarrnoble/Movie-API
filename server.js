// Import the http, url, fs, and path modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {
  // Parse the URL of the request
  const parsedUrl = url.parse(req.url, true);
  
  // Get the current timestamp
  const timestamp = new Date().toISOString();  // ISO string format for timestamp
  
  // Log the request URL and timestamp to log.txt
  const logMessage = `Timestamp: ${timestamp} - Requested URL: ${req.url}\n`;
  
  // Append the log message to log.txt
  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.error('Error logging request:', err);
    }
  });

  // Check if the URL contains the word "documentation"
  let filePath = parsedUrl.pathname.includes('documentation') 
    ? 'documentation.html'  // Serve documentation.html if the word "documentation" is in the URL
    : 'index.html';  // Otherwise, serve index.html

  // Set the correct content-type header based on the file type
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  if (extname === '.html') {
    contentType = 'text/html';
  }

  // Read the file and serve it
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file doesn't exist or another error occurs, return a 404 response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      // If the file is found, return it with a 200 OK status
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Make the server listen on port 8080
server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});


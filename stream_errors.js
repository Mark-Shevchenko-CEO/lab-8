const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname !== '/missing-file') {
    res.writeHead(404);
    return res.end('Not Found');
  }

  const fileName = parsed.query.fileName;

  if (!fileName) {
    res.writeHead(400);
    return res.end('Missing fileName parameter');
  }

  const filePath = path.join(process.cwd(), fileName);
  const readStream = fs.createReadStream(filePath);

  readStream.on('error', (err) => {
    res.writeHead(500);
    res.end('Internal Server Error');
  });

  readStream.on('open', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    readStream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
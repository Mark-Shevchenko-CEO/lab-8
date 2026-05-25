const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { Transform } = require('stream');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname !== '/upper') {
    res.writeHead(404);
    return res.end('Not Found');
  }

  const fileName = parsed.query.fileName;

  if (!fileName) {
    res.writeHead(400);
    return res.end('Missing fileName parameter');
  }

  const filePath = path.join(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    res.writeHead(400);
    return res.end('File not found');
  }

  const upperCase = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    }
  });

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  fs.createReadStream(filePath).pipe(upperCase).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
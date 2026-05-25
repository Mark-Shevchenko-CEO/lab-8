const http = require('http');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/count') {
    let bytes = 0;
    let chunks = 0;

    req.on('data', (chunk) => {
      bytes += chunk.length;
      chunks += 1;
    });

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ bytes, chunks }));
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
# Lab 8 — Node.js Streams

8.1 - `stream_file_to_response.js`, `GET /file?fileName=<name>`
8.2 - `stream_upload.js`, `POST /upload`
8.3 - `stream_transform.js`, `GET /upper?fileName=<name>`
8.4 - `stream_count.js`, `POST /count`
8.5 - `stream_error.js`, `GET /missing-file?fileName=<name>`

# Як запускати

```bash
node <файл> 3000
```

# Перевірка кожного завдання

*8.1 - stream file to response*
```bash
echo "Hello" > file.txt
curl -i "http://127.0.0.1:3000/file?fileName=file.txt"
# очікується: 200, тіло = вміст file.txt
```

*8.2 - stream upload*
```bash
curl -i -X POST http://127.0.0.1:3000/upload \
  -H "Content-Type: text/plain" \
  --data-binary "uploaded via stream"
# очікується: 200, файл upload.txt створено
```

*8.3 - stream transform*
```bash
echo "Hello Mixed Case" > file.txt
curl -i "http://127.0.0.1:3000/upper?fileName=file.txt"
# очікується: 200, тіло = "HELLO MIXED CASE"
```

*8.4 - stream count*
```bash
curl -i -X POST http://127.0.0.1:3000/count \
  -H "Content-Type: text/plain" \
  --data-binary "hello"
# очікується: 200, {"bytes":5,"chunks":1}
```

*8.5 - stream error*
```bash
curl -i "http://127.0.0.1:3000/missing-file?fileName=no_such_file.txt"
# очікується: 500, сервер продовжує працювати
curl -i "http://127.0.0.1:3000/missing-file"
# очікується: 400
```

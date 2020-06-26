First start the server with `node server.js`.

Change the function called on

```ts
const req = http.get("http://localhost:3000", (res) => {
  console.log(res.statusCode);
  handleWithFinished(res);
  setTimeout(() => req.abort(), 100);
});
```
From `handleWithFinished(res)` to `handleWithGetStream(res)`. 

The output with `handleWithFinished(res)` is:
```
200
Error [ERR_STREAM_PREMATURE_CLOSE]: Premature close
    at IncomingMessage.onclose (internal/streams/end-of-stream.js:75:15)
    at IncomingMessage.emit (events.js:315:20)
    at Socket.socketCloseListener (_http_client.js:383:11)
    at Socket.emit (events.js:327:22)
    at TCP.<anonymous> (net.js:674:12) {
  code: 'ERR_STREAM_PREMATURE_CLOSE'
}
```
It properly throws an error. With `getStream` however we get:
```
200
Hello World
```
It doesn't throw.

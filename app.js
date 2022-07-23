const express = require('express');

const app = express();
app.use(express.static(__dirname+'/public'));

const server = app.listen(3000, "127.0.0.1", () => {
  const serverAddress = server.address();
  console.log(`Listening on http://${serverAddress.address}:${serverAddress.port}`)
});
const ws = require("ws");
const express = require("express");
const http = require("http");
const path = require("path");

/**
 * WebSocket server for Express
 * @param {Object} server - HTTP server instance
 */

function setupWebSocket(server) {
  const wss = new ws.Server({ server });

  wss.on("connection", function connection(ws) {
    console.log("WebSocket client connected");

    ws.on("message", function incoming(message) {
      console.log("Received message:", message.toString());
      ws.send(message.toString());
    });
    ws.on("close", function close() {
      console.log("WebSocket client disconnected");
    });
  });
}

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.get("/websocket", (req, res) => {
  res.sendFile(path.join(__dirname, "public/websocket.html"));
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

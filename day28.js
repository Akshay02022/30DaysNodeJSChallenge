const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  const clients = new Set();

  wss.on("connection", function connection(ws) {
    clients.add(ws);

    ws.on("message", function incoming(message) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });

    ws.on("close", function () {
      clients.delete(ws);
    });
  });

  wss.on("listening", function () {
    console.log("WebSocket server is running.");
  });

  return wss;
}

setupWebSocketServer(server);

app.get("/websocket", (req, res) => {
  res.sendFile(path.join(__dirname, "public/websocket.html"));
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

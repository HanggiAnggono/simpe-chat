import express from "express";
import cors from "cors";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Hello to server");
});

const server = app.listen(5000, () => {
  console.log("App running on port 5000");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(socket) {
  socket.on("message", function incoming(message) {
    console.log("received: %s", message);
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        console.log(`sending ${message}`);
        client.send(`${message}`);
      }
    });
  });
});

// server.on("upgrade", (request, socket, head) => {
//   // @ts-ignore
//   wss.handleUpgrade(request, socket, head, (socket) => {
//     wss.emit("connection", socket, request);
//   });
// });

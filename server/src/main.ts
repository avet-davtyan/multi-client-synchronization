import WebSocket, { Server } from "ws";
import { envConfig } from "./utils/env";
envConfig("../.env");

function start() {
  const SERVER_PORT = process.env.SERVER_PORT;

  if(SERVER_PORT === undefined) { throw new Error("port is undefind"); }
  const port = Number(SERVER_PORT);

  const webSocketServer: Server = new Server({ port });

  webSocketServer.on("connection", (socket: WebSocket) => {

    socket.on("message", (message: string) => {
      socket.send(`Echo: ${message}`);
    });

    socket.on("close", () => {
      console.log("WebSocket connection closed");
    });

    socket.send("Welcome to the Node.js WebSocket server!");
  });

  console.log(`WebSocket server running on ws://localhost:${process.env.SERVER_PORT}`);
}

start();

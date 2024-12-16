import WebSocket, { Server } from "ws";
import { envConfig } from "./utils/env";
envConfig("../.env");

function start() {
  const SERVER_PORT = process.env.SERVER_PORT;

  let sockets: WebSocket[] = [];

  if(SERVER_PORT === undefined) { throw new Error("port is undefind"); }
  const port = Number(SERVER_PORT);

  const webSocketServer: Server = new Server({ port });

  webSocketServer.on("connection", (socket: WebSocket) => {
    sockets.push(socket);

    socket.on("message", (message: string) => {

      const eventMessage = JSON.parse(message);
      console.log(eventMessage);

      for(const _socket of sockets) {
        if(_socket == socket) { continue; }
        _socket.send(JSON.stringify(eventMessage));
      }
      socket.send(JSON.stringify(eventMessage));
    });

    socket.on("close", () => {
      console.log("WebSocket connection closed");
    });

    socket.send(
      JSON.stringify({message: "Welcome Enzo"})
    );
  });

  console.log(`WebSocket server running on ws://localhost:${process.env.SERVER_PORT}`);
}

start();

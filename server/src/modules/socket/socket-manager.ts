import {
  EventUnionSchema,
} from "@multi-client-sync/shared";
import {
  WebSocket,
  Server,
} from "ws";
import {
  EventHandler,
} from "../event-handler";
import { ISocketClient } from "./types";
import { randomUUID } from "crypto";
import { SocketService } from "./socket-service";

export class SocketManager {

  private _webSocketServer: Server;
  private _socketService: SocketService;
  private _eventHandler: EventHandler;

  public constructor() {

    this._eventHandler = EventHandler.getInstance();
    this._socketService = SocketService.getInstance();

    const SERVER_PORT = process.env.SERVER_PORT;
    if(SERVER_PORT === undefined) {
      throw new Error("port is undefind");
    }

    const port = Number(SERVER_PORT);
    this._webSocketServer = new Server({ port });

    console.log("creating socket Manager");
    console.log(port);

    this._webSocketServer.on("connection", (socket: WebSocket) => {
      this.connectSocketToWebSocketServet(socket);
    })

  }

  private connectSocketToWebSocketServet(socket: WebSocket) {

    const socketClient: ISocketClient = {
      id: randomUUID(),
      webSocket: socket,
    };

    console.log("connecting", socketClient.id)

    this._socketService.addSocketClient(socketClient);

    socket.on("message", async (message: string) => {

      const event = JSON.parse(message);
      const eventUnion = await EventUnionSchema.parseAsync(event);
      if(eventUnion === null) { return; }

      this._eventHandler.handleEvent(socketClient.id, eventUnion);

    })
  }

}

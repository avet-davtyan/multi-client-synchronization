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

export class SocketManager {

  private _webSocketServer: Server;
  private _connectedSockets: WebSocket[];
  private _eventHandler: EventHandler;

  public constructor() {

    this._eventHandler = EventHandler.getInstance();
    this._connectedSockets = [];

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
    this._connectedSockets.push(socket);
    socket.on("message", async (message: string) => {
      const event = JSON.parse(message);
      const eventUnion = await EventUnionSchema.parseAsync(event);
      if(eventUnion === null) { return; }
      this._eventHandler.handleEvent(socket, eventUnion);
    })
  }

}

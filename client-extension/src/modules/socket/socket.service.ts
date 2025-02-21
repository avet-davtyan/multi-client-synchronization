import { EventUnionSchema } from "@multi-client-sync/shared";
import { SocketEventHandler } from "../socket-event-handler";

export class SocketService {

  private static instance: SocketService;
  private _webSocket: WebSocket;
  private _socketEventHandler: SocketEventHandler;

  public constructor() {
    this._webSocket = new WebSocket("ws://localhost:6062");
    this._socketEventHandler = new SocketEventHandler();

    this._webSocket.addEventListener("message", (event: any) => {
      this._socketEventHandler.handlePopupEvent(event);
    })
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public sendEvent(event: EventUnionSchema) {
    const eventString = JSON.stringify(event);
    this._webSocket.send(eventString);
  }

  get webSocket(){
    return this._webSocket;
  }

}

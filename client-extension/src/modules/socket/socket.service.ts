import { EventUnionSchema } from "@multi-client-sync/shared";

export class SocketService {

  private static instance: SocketService;
  private _webSocket: WebSocket;

  public constructor() {
    this._webSocket = new WebSocket("ws://localhost:6062");
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

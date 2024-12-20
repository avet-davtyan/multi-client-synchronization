import { EventUnionSchema } from "@multi-client-sync/shared";

export class SocketService {

  private static instance: SocketService;
  private webSocket: WebSocket;

  public constructor() {
    this.webSocket = new WebSocket("ws://localhost:6062");
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public sendEvent(event: EventUnionSchema) {
    const eventString = JSON.stringify(event);
    this.webSocket.send(eventString);
  }

}

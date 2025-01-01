import { WebSocket } from "ws";

export interface ISocketClient {
  id: string;
  webSocket: WebSocket;
}

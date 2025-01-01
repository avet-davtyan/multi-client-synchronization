import { SocketContainer } from "./socket-container";
import { ISocketClient } from "./types";

export class SocketService {

  private static instance: SocketService;
  private _socketContainer: SocketContainer;

  public constructor() {
    this._socketContainer = SocketContainer.getInstance();
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  async addSocketClient(
    socketClient: ISocketClient,
  ): Promise<ISocketClient[]> {
    return this._socketContainer.addSocketClient(socketClient);
  }

  async getSocketClientListByIds(
    ids: string[],
  ): Promise<ISocketClient[]> {
    return this._socketContainer.getSocketClientListByIds(ids);
  }
}

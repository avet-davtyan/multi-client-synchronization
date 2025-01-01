import { ISocketClient } from "./types";

export class SocketContainer {

  private static instance: SocketContainer;
  private _socketClientList: ISocketClient[];

  public constructor() {
    this._socketClientList = [];
  }

  public static getInstance(): SocketContainer {
    if (!SocketContainer.instance) {
      SocketContainer.instance = new SocketContainer();
    }
    return SocketContainer.instance;
  }

  async addSocketClient(
    socketClient: ISocketClient,
  ): Promise<ISocketClient[]> {

    this._socketClientList.push(socketClient);

    return this._socketClientList;
  }

  async getSocketClientListByIds(
    ids: string[],
  ): Promise<ISocketClient[]> {

    let socketClientList: ISocketClient[] = [];

    socketClientList = this._socketClientList.filter((socketClient) => ids.includes(socketClient.id));

    return socketClientList;
  }

  get socketClientList() {
    return this._socketClientList;
  }
}

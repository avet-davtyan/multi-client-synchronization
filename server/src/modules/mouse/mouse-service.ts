import { RoomService } from "../room";
import { MouseClickEventSchema } from "@multi-client-sync/shared";
import { SocketService } from "../socket/socket-service";

export class MouseService {

  public static instance: MouseService;
  private _roomService: RoomService;
  private _socketService: SocketService;

  private constructor(){
    this._roomService = RoomService.getInstance();
    this._socketService = SocketService.getInstance();
  }

  public static getInstance(): MouseService {
    if (!MouseService.instance) {
      MouseService.instance = new MouseService();
    }
    return MouseService.instance;
  }

  async sendMouseClickEventToRoom(
    socketId: string,
    mouseClickEvent: MouseClickEventSchema,
  ) {

    console.log({socketId});
    console.log("start searching room");
    const room = await this._roomService.getRoomBySocketId(socketId);
    if(room === null) { return; }

    console.log("room found");

    const {
      participantSocketIdList,
    } = room;

    const socketClientList =
      await this._socketService.getSocketClientListByIds(participantSocketIdList);

    for(const socketClient of socketClientList) {
      const {
        webSocket,
      } = socketClient;

      webSocket.send(JSON.stringify(mouseClickEvent));
    }
  }

}

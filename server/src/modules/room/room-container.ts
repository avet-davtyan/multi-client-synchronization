import { IRoom } from "./room.interface";

export class RoomContainer {

  public static instance: RoomContainer;

  private _rooms: IRoom[];
  private constructor(){
    this._rooms = [];
  }

  public static getInstance(): RoomContainer {
    if (!RoomContainer.instance) {
      RoomContainer.instance = new RoomContainer();
    }
    return RoomContainer.instance;
  }

  async addRoom(room: IRoom) {

    if(this.roomExists(room.roomId)) { return; }

    this._rooms.push(room);
  }

  private roomExists(
    roomId: string,
  ): boolean {

    const room = this._rooms.find((_room) => _room.roomId === roomId);
    if(room !== undefined) { return true; }

    return false;
  }
}

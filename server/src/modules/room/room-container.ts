import { IRoom } from "./room.interface";
import { WebSocket } from "ws";

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

  async createRoom(room: IRoom) {

    if(this.roomExists(room.roomId)) { return; }

    this._rooms.push(room);
  }

  async getRoomById(
    roomId: string,
  ): Promise<IRoom | null> {

    const room = this._rooms.find((_room) => _room.roomId === roomId);
    if(room === undefined) { return null; }

    return room;
  }

  async addParticipantToRoom(
    socket: WebSocket,
    roomId: string,
  ) {
    const room = await this.getRoomById(roomId);
    if(room === null) { return; }

    const participant = room.participants.find((_socket) => _socket === socket);
    if(participant !== undefined) { return; }

    room.participants.push(socket);
  }

  private roomExists(
    roomId: string,
  ): boolean {

    const room = this._rooms.find((_room) => _room.roomId === roomId);
    if(room !== undefined) { return true; }

    return false;
  }
}

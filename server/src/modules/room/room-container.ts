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

  async createRoom(room: IRoom) {

    if(this.roomExists(room.roomId)) { return; }

    console.log({room});

    this._rooms.push(room);
  }

  async getRoomById(
    roomId: string,
  ): Promise<IRoom> {

    const room = this._rooms.find((_room) => _room.roomId === roomId);
    if(room === undefined) {
      throw new Error("room not found");
    }

    return room;
  }

  async getRoomBySocketId(
    socketId: string,
  ): Promise<IRoom> {

    const room = this._rooms.find((_room) => _room.participantSocketIdList.includes(socketId));
    if(room === undefined) {
      throw new Error("room not found");
    }
    return room;
  }

  async addParticipantToRoom(
    socketId: string,
    roomId: string,
  ) {
    const room = await this.getRoomById(roomId);

    const participant = room.participantSocketIdList.find((_socketId) => _socketId === socketId);
    if(participant !== undefined) { return; }

    room.participantSocketIdList.push(socketId);
  }

  private roomExists(
    roomId: string,
  ): boolean {

    const room = this._rooms.find((_room) => _room.roomId === roomId);
    if(room !== undefined) { return true; }

    return false;
  }
}

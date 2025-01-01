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

    this._rooms.push(room);

    console.log(this._rooms);
  }

  async getRoomById(
    roomId: string,
  ): Promise<IRoom | null> {

    const room = this._rooms.find((_room) => _room.roomId === roomId);
    if(room === undefined) { return null; }

    return room;
  }

  async getRoomBySocketId(
    socketId: string,
  ): Promise<null | IRoom> {

    console.log("getRoomBySocketId container");
    console.log({socketId, rooms: this._rooms});
    const room = this._rooms.find((_room) => _room.participantSocketIdList.includes(socketId));
    console.log({room})
    if(room === undefined) { return null; }
    return room;
  }

  async addParticipantToRoom(
    socketId: string,
    roomId: string,
  ) {
    const room = await this.getRoomById(roomId);
    if(room === null) { return; }

    const participant = room.participantSocketIdList.find((_socketId) => _socketId === socketId);
    if(participant !== undefined) { return; }

    room.participantSocketIdList.push(socketId);

    console.log("joined");
    console.log(this._rooms);
  }

  private roomExists(
    roomId: string,
  ): boolean {

    const room = this._rooms.find((_room) => _room.roomId === roomId);
    if(room !== undefined) { return true; }

    return false;
  }
}

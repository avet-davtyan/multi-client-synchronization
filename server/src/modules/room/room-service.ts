import {
  CreateRoomEventSchema,
  RoomVisibilityType,
} from "@multi-client-sync/shared";
import { RoomContainer } from "./room-container";
import { IRoom } from "./room.interface";
import { randomUUID } from "crypto";

export class RoomService {

  public static instance: RoomService;
  private _roomContainer: RoomContainer;

  private constructor(){
    this._roomContainer = RoomContainer.getInstance();
  }

  public static getInstance(): RoomService {
    if (!RoomService.instance) {
      RoomService.instance = new RoomService();
    }
    return RoomService.instance;
  }

  async createRoom(
    socketId: string,
    createRoomEvent: CreateRoomEventSchema,
  ) {

    const {
      eventData,
    } = createRoomEvent;
    const {
      roomVisibilityType,
    } = eventData;

    let room: null | IRoom = null;

    if(roomVisibilityType === RoomVisibilityType.PRIVATE){
      const privateRoom: IRoom = {
        roomVisibility: roomVisibilityType,
        roomId: randomUUID(),
        adminSocketId: socketId,
        participantSocketIdList: [socketId],
        password: eventData.roomPassword,
      }

      room = privateRoom;
    }
    else if(roomVisibilityType === RoomVisibilityType.PUBLIC) {
      const publicRoom: IRoom = {
        roomVisibility: roomVisibilityType,
        roomId: randomUUID(),
        adminSocketId: socketId,
        participantSocketIdList: [socketId],
      }
      room = publicRoom;
    }

    if(room === null) {
      throw new Error("unhandled state");
    }

    this._roomContainer.createRoom(room);

  }

  async joinToRoom(
    socketId: string,
    roomId: string,
    roomPassword?: string,
  ) {
    const hasAccessToJoinRoom = await this.hasAccessToJoinRoom(socketId, roomId, roomPassword);
    if(hasAccessToJoinRoom === false) {
      throw new Error("you have no access to room")
    }

    this._roomContainer.addParticipantToRoom(socketId, roomId);
  }

  async getRoomBySocketId(
    socketId: string,
  ): Promise<IRoom> {
    const room = await this._roomContainer.getRoomBySocketId(socketId);

    return room;
  }

  private async hasAccessToJoinRoom(
    socketId: string,
    roomId: string,
    roomPassword?: string,
  ): Promise<boolean> {
    let hasAccessToJoinRoom = true;

    const room = await this._roomContainer.getRoomById(roomId);

    if(room.roomVisibility === RoomVisibilityType.PRIVATE) {
      if(this.passwordsMatch(roomPassword, room.password) === false) {
        hasAccessToJoinRoom = false;
      }
    }

    return hasAccessToJoinRoom;
  }

  private passwordsMatch(
    passwordInput: string | undefined,
    passwordExisting: string,
  ): boolean {
    if(passwordInput === passwordExisting) { return true; }
    return false;
  }
}

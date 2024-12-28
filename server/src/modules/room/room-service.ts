import {
  CreateRoomEventSchema,
  RoomVisibilityType,
} from "@multi-client-sync/shared";
import { RoomContainer } from "./room-container";
import { IRoom } from "./room.interface";
import { randomUUID } from "crypto";
import { WebSocket } from "ws";

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
    socket: WebSocket,
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
        admin: socket,
        participants: [],
        password: eventData.roomPassword,
      }

      room = privateRoom;
    }
    else if(roomVisibilityType === RoomVisibilityType.PUBLIC) {
      const publicRoom: IRoom = {
        roomVisibility: roomVisibilityType,
        roomId: randomUUID(),
        admin: socket,
        participants: [],
      }
      room = publicRoom;
    }

    if(room === null) { return; }

    this._roomContainer.createRoom(room);

  }

  async joinToRoom(
    socket: WebSocket,
    roomId: string,
    roomPassword?: string,
  ) {

    let hasAccessToJoinToRoom = true;
    const room = await this._roomContainer.getRoomById(roomId);
    if(room === null) { return; }

    if(room.roomVisibility === RoomVisibilityType.PRIVATE) {
      if(this.passwordsMatch(roomPassword, room.password) === false) {
        hasAccessToJoinToRoom = false;
      }
    }

    if(hasAccessToJoinToRoom === false) {
      return;
    }

    this._roomContainer.addParticipantToRoom(socket, roomId);

  }

  private passwordsMatch(
    passwordInput: string | undefined,
    passwordExisting: string,
  ): boolean {
    if(passwordInput === passwordExisting) { return true; }
    return false;
  }
}

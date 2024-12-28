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

    this._roomContainer.addRoom(room);

  }
}

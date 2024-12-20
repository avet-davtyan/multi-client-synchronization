import {
  CreateRoomEventSchema,
  EventType,
  RoomVisibilityType,
} from "@multi-client-sync/shared";
import {
  ICreatePrivateRoomOptions,
} from "./types";
import { SocketService } from "../socket/socket.service";

export class RoomService {

  private static instance: RoomService;
  private socketService: SocketService;

  public constructor() {
    this.socketService = SocketService.getInstance();
  }

  public static getInstance(): RoomService {
    if (!RoomService.instance) {
      RoomService.instance = new RoomService();
    }
    return RoomService.instance;
  }

  public createPrivateRoom(
    options: ICreatePrivateRoomOptions,
  ) {
    const {
      name,
      password,
    } = options;

    const createPirvateRoomEvent: CreateRoomEventSchema = {
      eventType: EventType.CREATE_ROOM,
      eventData: {
        roomVisibilityType: RoomVisibilityType.PRIVATE,
        roomName: name,
        roomPassword: password,
      }
    }

    this.socketService.sendEvent(createPirvateRoomEvent);

  }
}

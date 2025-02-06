import {
  EventType,
  EventUnionSchema,
  CreateRoomEventSchema,
  MouseClickEventSchema,
  JoinRoomEventSchema,
} from "@multi-client-sync/shared";
import { RoomService } from "../room";
import { MouseService } from "../mouse/mouse-service";
import { errorEvent, successEvent, SuccessOrError } from "../../utils/success-error";

export class EventHandler {

  public static instance: EventHandler;
  private _roomService: RoomService;
  private _mouseService: MouseService;

  public constructor() {
    this._roomService = RoomService.getInstance();
    this._mouseService = MouseService.getInstance();
  }

  public static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }
    return EventHandler.instance;
  }

  async handleEvent(
    socketId: string,
    event: EventUnionSchema,
  ): Promise<SuccessOrError> {

    if(event.eventType === EventType.MOUSE_CLICK) {
      return this.handeMouseClickEvent(socketId, event);
    }
    else if(event.eventType === EventType.CREATE_ROOM) {
      return this.handleCreateRoomEvent(socketId, event);
    }
    else if(event.eventType === EventType.JOIN_ROOM) {
      return this.handleJoinRoomEvent(socketId, event);
    }

    return errorEvent("unknown event");
  }

  private async handeMouseClickEvent(
    socketId: string,
    mouseClickEvent: MouseClickEventSchema,
  ) {
    try {
      this._mouseService.sendMouseClickEventToRoom(socketId, mouseClickEvent);
    } catch {
      return errorEvent("can't register mouse click event");
    }

    return successEvent("mouse click event successfully registered");
  }

  private async handleCreateRoomEvent(
    socketId: string,
    createRoomEvent: CreateRoomEventSchema,
  ): Promise<SuccessOrError> {
    try {
      this._roomService.createRoom(socketId, createRoomEvent);
    } catch {
      return errorEvent("can't create room");
    }

    return successEvent("room successfully created");
  }

  private async handleJoinRoomEvent(
    socketId: string,
    joinRoomEvent: JoinRoomEventSchema,
  ) {
    try {
      const {
        eventData,
      } = joinRoomEvent;

      this._roomService.joinToRoom(
        socketId,
        eventData.roomId,
        eventData.roomPassword,
      );
    } catch {
      return errorEvent("can't create room");
    }

    return successEvent("room successfully created");
  }

}

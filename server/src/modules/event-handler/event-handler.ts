import {
  EventType,
  EventUnionSchema,
  CreateRoomEventSchema,
  MouseClickEventSchema,
  JoinRoomEventSchema,
} from "@multi-client-sync/shared";
import { RoomService } from "../room";
import { MouseService } from "../mouse/mouse-service";

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
  ) {

    if(event.eventType === EventType.MOUSE_CLICK) {
      this.handeMouseClickEvent(socketId, event);
    }
    else if(event.eventType === EventType.CREATE_ROOM) {
      this.handleCreateRoomEvent(socketId, event);
    }
    else if(event.eventType === EventType.JOIN_ROOM) {
      this.handleJoinRoomEvent(socketId, event);
    }
  }

  private async handeMouseClickEvent(
    socketId: string,
    mouseClickEvent: MouseClickEventSchema,
  ) {
    console.log("handleJoinRoomEvent");

    this._mouseService.sendMouseClickEventToRoom(socketId, mouseClickEvent);
  }

  private async handleCreateRoomEvent(
    socketId: string,
    createRoomEvent: CreateRoomEventSchema,
  ) {
    this._roomService.createRoom(socketId, createRoomEvent);
  }

  private async handleJoinRoomEvent(
    socketId: string,
    joinRoomEvent: JoinRoomEventSchema,
  ) {
    const {
      eventData,
    } = joinRoomEvent;

    this._roomService.joinToRoom(
      socketId,
      eventData.roomId,
      eventData.roomPassword,
    );
  }

}

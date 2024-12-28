import {
  EventType,
  EventUnionSchema,
  CreateRoomEventSchema,
  MouseClickEventSchema,
  JoinRoomEventSchema,
} from "@multi-client-sync/shared";
import { RoomService } from "../room/room-service";
import { WebSocket } from "ws";

export class EventHandler {

  public static instance: EventHandler;
  private _roomSerive: RoomService;

  public constructor() {
    this._roomSerive = RoomService.getInstance();
  }

  public static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }
    return EventHandler.instance;
  }

  async handleEvent(
    socket: WebSocket,
    event: EventUnionSchema,
  ) {

    if(event.eventType === EventType.MOUSE_CLICK) {
      this.handeMouseClickEvent(socket, event);
    }
    else if(event.eventType === EventType.CREATE_ROOM) {
      this.handleCreateRoomEvent(socket, event);
    }
    else if(event.eventType === EventType.JOIN_ROOM) {
      this.handleJoinRoomEvent(socket, event);
    }
  }

  private async handeMouseClickEvent(
    socket: WebSocket,
    mouseClickEvent: MouseClickEventSchema,
  ) {
    console.log("mouse click", mouseClickEvent);
  }

  private async handleCreateRoomEvent(
    socket: WebSocket,
    createRoomEvent: CreateRoomEventSchema,
  ) {
    this._roomSerive.createRoom(socket, createRoomEvent);
  }

  private async handleJoinRoomEvent(
    socket: WebSocket,
    joinRoomEvent: JoinRoomEventSchema,
  ) {
    const {
      eventData,
    } = joinRoomEvent;

    this._roomSerive.joinToRoom(
      socket,
      eventData.roomId,
      eventData.roomPassword,
    );
  }

}

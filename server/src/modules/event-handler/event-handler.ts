import {
  EventType,
  EventUnionSchema,
  CreateRoomEventSchema,
  MouseClickEventSchema,
  JoinRoomEventSchema,
  MouseMoveEventSchema,
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
      return this.handleMouseClickEvent(socketId, event);
    }
    else if(event.eventType === EventType.CREATE_ROOM) {
      return this.handleCreateRoomEvent(socketId, event);
    }
    else if(event.eventType === EventType.JOIN_ROOM) {
      return this.handleJoinRoomEvent(socketId, event);
    }
    else if(event.eventType === EventType.MOUSE_MOVE) {
      return this.handleMouseMoveEvent(socketId, event);
    }

    return errorEvent({
      silent: false,
      message: "unknown event"
    });
  }

  private async handleMouseClickEvent(
    socketId: string,
    mouseClickEvent: MouseClickEventSchema,
  ) {
    try {
      this._mouseService.sendMouseClickEventToRoom(socketId, mouseClickEvent);
    } catch {
      return errorEvent({
        silent: false,
        message: "can't register mouse click event",
      });
    }

    return successEvent({
      silent: true,
      message: "mouse click event successfully registered",
    });
  }

  private async handleMouseMoveEvent(
    socketId: string,
    mouseMoveEvent: MouseMoveEventSchema,
  ) {
    try {
      this._mouseService.sendMouseMoveEventToRoom(socketId, mouseMoveEvent);
    } catch {
      return errorEvent({
        silent: true,
        message: "can't register mouse move event",
      });
    }

    return successEvent({
      silent: true,
      message: "mouse move event successfully registered",
    });
  }

  private async handleCreateRoomEvent(
    socketId: string,
    createRoomEvent: CreateRoomEventSchema,
  ): Promise<SuccessOrError> {
    try {
      this._roomService.createRoom(socketId, createRoomEvent);
    } catch {
      return errorEvent({
        silent: false,
        message: "can't create room",
      });
    }

    return successEvent({
      silent: false,
      message: "room successfully created",
    });
  }

  private async handleJoinRoomEvent(
    socketId: string,
    joinRoomEvent: JoinRoomEventSchema,
  ): Promise<SuccessOrError> {
    try {
      const {
        eventData,
      } = joinRoomEvent;

      await this._roomService.joinToRoom(
        socketId,
        eventData.roomId,
        eventData.roomPassword,
      );
    } catch {
      return errorEvent({
        silent: false,
        message: "can't join to room",
      });
    }

    return successEvent({
      silent: false,
      message: "you successfully joined to room",
    });
  }

}

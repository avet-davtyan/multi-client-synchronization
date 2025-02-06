import { CreateRoomEventSchema, EventType, EventUnionSchema, RoomVisibilityType } from "@multi-client-sync/shared";
import { RoomService } from "../room";

export class EventHandler {

  public static instance: EventHandler;
  private _roomService: RoomService;

  public constructor() {
    this._roomService = RoomService.getInstance();

    chrome.runtime.onMessage.addListener(
      this.handlePopupEvent.bind(this),
    );
  }

  public static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }
    return EventHandler.instance;
  }

  async handlePopupEvent(
    event: unknown,
  ) {
    console.log("handlePopupEvent")
    let parsedEvent: undefined | EventUnionSchema = undefined;
    try {
      parsedEvent = await EventUnionSchema.parseAsync(event);
    } catch {
      console.error("can't parse event");
    }

    if(parsedEvent === undefined) { return; }

    if(parsedEvent.eventType === EventType.CREATE_ROOM) {
      if (parsedEvent.eventData.roomVisibilityType === RoomVisibilityType.PUBLIC) {
        return;
      }

      const {
        roomName,
        roomPassword,
      } = parsedEvent.eventData;

      this._roomService.createPrivateRoom({
        name: roomName,
        password: roomPassword,
      })
    }
  }

  private async handleCreateRoomEvent(
    event: CreateRoomEventSchema,
  ) {
    if (event.eventData.roomVisibilityType === RoomVisibilityType.PUBLIC) {
      return;
    }

    const {
      roomName,
      roomPassword,
    } = event.eventData;

    this._roomService.createPrivateRoom({
      name: roomName,
      password: roomPassword,
    })

  }

}

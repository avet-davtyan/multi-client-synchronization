import {
  RoomService,
} from "../room";
import {
  CreatePrivateRoomPopupEventSchema,
  PopupEventType,
  PopupEventUnionSchema,
} from "../../popup-event";

export class PopupEventHandler {

  public static instance: PopupEventHandler;
  private _roomService: RoomService;

  public constructor() {
    this._roomService = RoomService.getInstance();

    chrome.runtime.onMessage.addListener((event: unknown) => {
      this.handlePopupEvent(event);
    });
  }

  public static getInstance(): PopupEventHandler {
    if (!PopupEventHandler.instance) {
      PopupEventHandler.instance = new PopupEventHandler();
    }
    return PopupEventHandler.instance;
  }

  async handlePopupEvent(
    event: unknown,
  ) {
    console.log("handlePopupEvent")
    let parsedEvent: undefined | PopupEventUnionSchema = undefined;
    try {
      parsedEvent = await PopupEventUnionSchema.parseAsync(event);
    } catch {
      console.error("can't parse event");
    }

    if(parsedEvent === undefined) { return; }

    if(parsedEvent.eventType === PopupEventType.CREATE_PRIVATE_ROOM) {
      await this.handleCreateRoomEvent(parsedEvent);
    }
  }

  private async handleCreateRoomEvent(
    event: CreatePrivateRoomPopupEventSchema,
  ) {

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

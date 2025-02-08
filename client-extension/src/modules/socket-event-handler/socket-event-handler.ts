import {
  EventType,
  EventUnionSchema,
  SuccessEventSchema,
} from "@multi-client-sync/shared";
import {
  showToast,
} from "../../utils";

export class SocketEventHandler {

  public static instance: SocketEventHandler;

  public constructor() {
  }

  public static getInstance(): SocketEventHandler {
    if (!SocketEventHandler.instance) {
      SocketEventHandler.instance = new SocketEventHandler();
    }
    return SocketEventHandler.instance;
  }

  async handlePopupEvent(
    event: any,
  ) {
    const recievedData = JSON.parse(event.data);

    let eventUnion: undefined | EventUnionSchema = undefined;

    try {
      eventUnion = await EventUnionSchema.parseAsync(recievedData);
    } catch {
      console.error("can't parse event");
    }

    if(eventUnion === undefined) { return; }
    if(eventUnion.eventType === EventType.SUCCESS) {
      this.handleSuccessEvent(eventUnion);
    }
  }

  private handleSuccessEvent(event: SuccessEventSchema) {

    let toastMsg: undefined | string = undefined;
    console.log(event.eventData.message);
    if(
      event.eventData.message !== null
    ) {
      toastMsg = event.eventData.message;
    }
    showToast(toastMsg);

  }

}

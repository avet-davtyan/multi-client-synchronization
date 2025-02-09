import {
  ErrorEventSchema,
  EventType,
  EventUnionSchema,
  MouseClickEventSchema,
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
    if(eventUnion.eventType === EventType.ERROR) {
      this.handleErrorEvent(eventUnion);
    }
    if(eventUnion.eventType === EventType.MOUSE_CLICK) {
      this.handleMouseClickEvent(eventUnion);
    }
  }

  private handleSuccessEvent(event: SuccessEventSchema) {

    let toastMsg: undefined | string = undefined;
    if(
      event.eventData.message !== null
    ) {
      toastMsg = event.eventData.message;
    }
    showToast(toastMsg);

  }

  private handleErrorEvent(event: ErrorEventSchema) {

    let toastMsg: undefined | string = undefined;
    if(
      event.eventData.message !== null
    ) {
      toastMsg = event.eventData.message;
    }
    showToast(toastMsg);

  }

  private handleMouseClickEvent(event: MouseClickEventSchema) {
    const {
      mousePositionX,
      mousePositionY,
      targetOuterHTML,
    } = event.eventData;

    const elements = Array.from(document.body.getElementsByTagName("*"));

    let targetElement: undefined | Element = undefined;

    if(targetOuterHTML !== null) {
      targetElement = elements.find(
        (el) => el.outerHTML.trim() === targetOuterHTML.trim()
      );
    }

    if (targetElement) {
      targetElement.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    } else {
      document.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          clientX: mousePositionX,
          clientY: mousePositionY
        })
      );
    }

  }

}

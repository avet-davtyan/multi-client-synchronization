import {
  ErrorEventSchema,
  EventType,
  EventUnionSchema,
  MouseClickEventSchema,
  MouseMoveEventSchema,
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
    if(eventUnion.eventType === EventType.MOUSE_MOVE) {
      this.handleMouseMoveEvent(eventUnion);
    }
  }

  private handleSuccessEvent(event: SuccessEventSchema) {

    if(event.eventData.silent === true) {
      return;
    }

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

  private handleMouseMoveEvent(event: MouseMoveEventSchema) {
    const {
      mousePositionX,
      mousePositionY,
    } = event.eventData;

    let customCursor = document.getElementById("custom-cursor") as HTMLDivElement;

    if (!customCursor) {
      customCursor = document.createElement("div");
      customCursor.id = "custom-cursor";
      customCursor.style.position = "fixed";
      customCursor.style.width = "20px";
      customCursor.style.height = "20px";
      customCursor.style.backgroundColor = "red";
      customCursor.style.borderRadius = "50%";
      customCursor.style.pointerEvents = "none";
      customCursor.style.zIndex = "9999";
      document.body.appendChild(customCursor);
    }
    customCursor.style.transform = `translate(${mousePositionX}px, ${mousePositionY}px)`;
  }

}

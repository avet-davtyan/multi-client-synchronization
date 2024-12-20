import {z} from "zod";
import {
  MouseClickEventDataSchema,
  MouseClickEventSchema,
  EventType,
} from "@multi-client-sync/shared";
import { SocketService } from "../socket";

const ElementWithOuterHtmlSchema = z.object({
  outerHTML: z.string(),
})

export class MouseClickService {

  public static instance: MouseClickService;
  private socketService: SocketService;

  public constructor() {
    this.socketService = SocketService.getInstance();
  }

  public static getInstance(): MouseClickService {
    if (!MouseClickService.instance) {
      MouseClickService.instance = new MouseClickService();
    }
    return MouseClickService.instance;
  }

  async sendMouseClickEvent(
    event: MouseEvent,
  ) {

    let outerHTML: null | string = null;
    if(event.target !== null) {
      outerHTML = await this.getOuterHTMLFromEventTarget(event.target)
    }

    const mouseClickEventData: MouseClickEventDataSchema = {
      targetOuterHTML: outerHTML,
      mousePositionX: event.clientX,
      mousePositionY: event.clientY,
    }

    const mouseClickEvent: MouseClickEventSchema = {
      eventType: EventType.MOUSE_CLICK,
      eventData: mouseClickEventData,
    }

    return mouseClickEvent;
  }

  private async getOuterHTMLFromEventTarget(eventTarget: EventTarget){
    const element = await ElementWithOuterHtmlSchema.parseAsync(eventTarget);
    return element.outerHTML;
  }

}

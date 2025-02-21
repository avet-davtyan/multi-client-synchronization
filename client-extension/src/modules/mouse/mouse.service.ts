import {z} from "zod";
import {
  MouseClickEventDataSchema,
  MouseClickEventSchema,
  EventType,
  MouseMoveEventDataSchema,
  MouseMoveEventSchema,
} from "@multi-client-sync/shared";
import { SocketService } from "../socket";

const ElementWithOuterHtmlSchema = z.object({
  outerHTML: z.string(),
})

export class MouseService {

  public static instance: MouseService;
  private socketService: SocketService;

  public constructor() {
    this.socketService = SocketService.getInstance();
  }

  public static getInstance(): MouseService {
    if (!MouseService.instance) {
      MouseService.instance = new MouseService();
    }
    return MouseService.instance;
  }

  async generateMouseClickEvent(
    event: MouseEvent,
  ): Promise<MouseClickEventSchema> {

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

  async generateMouseMoveEvent(
    event: MouseEvent,
  ): Promise<MouseMoveEventSchema> {

    const mouseMoveEventData: MouseMoveEventDataSchema = {
      mousePositionX: event.clientX,
      mousePositionY: event.clientY,
    };

    const mouseMoveEvent: MouseMoveEventSchema = {
      eventType: EventType.MOUSE_MOVE,
      eventData: mouseMoveEventData,
    };

    return mouseMoveEvent;
  }

  private async getOuterHTMLFromEventTarget(eventTarget: EventTarget){
    const element = await ElementWithOuterHtmlSchema.parseAsync(eventTarget);
    return element.outerHTML;
  }

}

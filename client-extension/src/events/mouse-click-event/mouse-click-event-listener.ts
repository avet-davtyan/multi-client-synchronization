import {
  EventType,
  MouseClickEventDataSchema,
  MouseClickEventSchema,
} from "@multi-client-sync/shared";
import { z } from "zod";

const ElementWithOuterHtmlSchema = z.object({
  outerHTML: z.string(),
})

export async function mouseClickEventListener(event: MouseEvent) {
  const mouseClickEvent = await generateMouseClickEvent(event);

  console.log(mouseClickEvent);
}

async function generateMouseClickEvent(
  event: MouseEvent,
): Promise<MouseClickEventSchema> {

  let outerHTML: null | string = null;
  if(event.target !== null) {
    outerHTML = await getOuterHTMLFromEventTarget(event.target)
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

async function getOuterHTMLFromEventTarget(eventTarget: EventTarget){
  const element = await ElementWithOuterHtmlSchema.parseAsync(eventTarget);
  return element.outerHTML;
}

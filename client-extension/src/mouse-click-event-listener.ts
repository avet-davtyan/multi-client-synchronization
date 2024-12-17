import { EventType, MouseClickEventDTO } from "@multi-client-sync/shared";
import { z } from "zod";

const ElementWithOuterHtmlSchema = z.object({
  outerHTML: z.string(),
})

export async function mouseClickEventListener(event: MouseEvent) {

  const mouseClickEvent = await generateMouseClickEvent(event);

  //NOTE: send this mouseClickEvent to socketServer
}

async function generateMouseClickEvent(
  event: MouseEvent,
): Promise<MouseClickEventDTO> {

  let outerHTML: null | string = null;
  if(event.target !== null) {
    outerHTML = await getOuterHTMLFromEventTarget(event.target)
  }

  const mouseClickEvent: MouseClickEventDTO = {
    eventType: EventType.MOUSE_CLICK,
    targetOuterHTML: outerHTML,
    mousePositionX: event.clientX,
    mousePositionY: event.clientY,
  }

  return mouseClickEvent;
}

async function getOuterHTMLFromEventTarget(eventTarget: EventTarget){
  const element = await ElementWithOuterHtmlSchema.parseAsync(eventTarget);
  return element.outerHTML;
}
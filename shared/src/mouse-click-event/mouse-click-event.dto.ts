import { z } from "zod";
import { EventType } from "../event-type";

export const MouseClickEventDTO = z.object({
  eventType: z.literal(EventType.MOUSE_CLICK),
  targetOuterHTML: z.string().nullable(),
  mousePositionX: z.number(),
  mousePositionY: z.number(),
});

export type MouseClickEventDTO = z.infer<typeof MouseClickEventDTO>;

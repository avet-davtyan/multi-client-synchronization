import { z } from "zod";
import { EventType } from "../../event-type";

export const MouseClickEventDataSchema = z.object({
  targetOuterHTML: z.string().nullable(),
  mousePositionX: z.number(),
  mousePositionY: z.number(),
})

export const MouseClickEventSchema = z.object({
  eventType: z.literal(EventType.MOUSE_CLICK),
  eventData: MouseClickEventDataSchema,
});

export type MouseClickEventSchema = z.infer<typeof MouseClickEventSchema>;
export type MouseClickEventDataSchema = z.infer<typeof MouseClickEventDataSchema>;

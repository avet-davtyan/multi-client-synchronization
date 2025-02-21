import { z } from "zod";
import { EventType } from "../../event-type";

export const MouseMoveEventDataSchema = z.object({
  mousePositionX: z.number(),
  mousePositionY: z.number(),
})

export const MouseMoveEventSchema = z.object({
  eventType: z.literal(EventType.MOUSE_MOVE),
  eventData: MouseMoveEventDataSchema,
});

export type MouseMoveEventSchema = z.infer<typeof MouseMoveEventSchema>;
export type MouseMoveEventDataSchema = z.infer<typeof MouseMoveEventDataSchema>;

import { z } from "zod";

export enum EventType {
  MOUSE_CLICK = "MOUSE_CLICK",
}

export const EventTypeEnum = z.nativeEnum(EventType);
export type EventTypeEnum = z.infer<typeof EventTypeEnum>;

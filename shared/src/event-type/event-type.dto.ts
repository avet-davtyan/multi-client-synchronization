import { z } from "zod";

export enum EventType {
  MOUSE_CLICK = "MOUSE_CLICK",
  CREATE_ROOM = "CREATE_ROOM",
}

export const EventTypeEnum = z.nativeEnum(EventType);
export type EventTypeEnum = z.infer<typeof EventTypeEnum>;

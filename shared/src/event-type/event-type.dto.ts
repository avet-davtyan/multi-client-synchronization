import { z } from "zod";

export enum EventType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  MOUSE_CLICK = "MOUSE_CLICK",
  CREATE_ROOM = "CREATE_ROOM",
  JOIN_ROOM = "JOIN_ROOM",
}

export const EventTypeEnum = z.nativeEnum(EventType);
export type EventTypeEnum = z.infer<typeof EventTypeEnum>;

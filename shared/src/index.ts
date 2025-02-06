import {z} from "zod";
import {
  CreateRoomEventSchema,
  JoinRoomEventSchema,
} from "./room";
import {
  MouseClickEventSchema,
} from "./mouse";
import {
  ErrorEventSchema,
  SuccessEventSchema,
} from "./success-error";

export * from "./event-type";
export * from "./mouse";
export * from "./room";
export * from "./success-error";

export const EventUnionSchema = z.union([
  CreateRoomEventSchema,
  JoinRoomEventSchema,
  MouseClickEventSchema,
  SuccessEventSchema,
  ErrorEventSchema,
]);

export type EventUnionSchema = z.infer<typeof EventUnionSchema>;

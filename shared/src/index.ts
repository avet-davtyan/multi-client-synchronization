import {z} from "zod";
import {
  CreateRoomEventSchema,
  JoinRoomEventSchema,
} from "./room";
import { MouseClickEventSchema } from "./mouse";

export * from "./event-type";
export * from "./mouse";
export * from "./room";

export const EventUnionSchema = z.union([
  CreateRoomEventSchema,
  JoinRoomEventSchema,
  MouseClickEventSchema,
]);

export type EventUnionSchema = z.infer<typeof EventUnionSchema>;

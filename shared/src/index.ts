import {z} from "zod";
import { CreateRoomEventSchema } from "./room";
import { MouseClickEventSchema } from "./mouse";

export * from "./event-type";
export * from "./mouse";
export * from "./room";

export const EventUnionSchema = z.union([
  CreateRoomEventSchema,
  MouseClickEventSchema,
]);

export type EventUnionSchema = z.infer<typeof EventUnionSchema>;

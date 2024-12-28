import { z } from "zod";
import { EventType } from "../../event-type";

export const JoinRoomEventDataSchema = z.object({
  roomId: z.string(),
  roomPassword: z.string().optional(),
});

export const JoinRoomEventSchema = z.object({
  eventType: z.literal(EventType.JOIN_ROOM),
  eventData: JoinRoomEventDataSchema,
});

export type JoinRoomEventSchema = z.infer<typeof JoinRoomEventSchema>;
export type JoinRoomEventDataSchema = z.infer<typeof JoinRoomEventDataSchema>;

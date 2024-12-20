import { z } from "zod";
import { EventType } from "../../event-type";
import { RoomVisibilityType } from "../room-visibility";

export const PrivateRoomSchema = z.object({
  roomVisibilityType: z.literal(RoomVisibilityType.PRIVATE),
  roomName: z.string(),
  roomPassword: z.string(),
});

export const PublicRoomSchema = z.object({
  roomVisibilityType: z.literal(RoomVisibilityType.PUBLIC),
  roomName: z.string(),
});

export const RoomEventDataSchema = z.union([PrivateRoomSchema, PublicRoomSchema]);

export const CreateRoomEventSchema = z.object({
  eventType: z.literal(EventType.CREATE_ROOM),
  eventData: RoomEventDataSchema,
});

export type PrivateRoomSchema = z.infer<typeof PrivateRoomSchema>;
export type PublicRoomSchema = z.infer<typeof PublicRoomSchema>;
export type CreateRoomEventSchema = z.infer<typeof CreateRoomEventSchema>;
export type RoomEventDataSchema = z.infer<typeof RoomEventDataSchema>;

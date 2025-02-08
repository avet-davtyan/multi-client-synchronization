import { z } from "zod";
import { PopupEventType } from "./popup-event-type";

export const PrivateRoomJoinSchema = z.object({
  roomId: z.string(),
  roomPassword: z.string(),
});

export const JoinPrivateRoomPopupEventSchema = z.object({
  eventType: z.literal(PopupEventType.JOIN_PRIVATE_ROOM),
  eventData: PrivateRoomJoinSchema,
});

export type PrivateRoomJoinSchema = z.infer<typeof PrivateRoomJoinSchema>;
export type JoinPrivateRoomPopupEventSchema = z.infer<typeof JoinPrivateRoomPopupEventSchema>;

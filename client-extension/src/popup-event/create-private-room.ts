import { z } from "zod";
import { PopupEventType } from "./popup-event-type";

export const PrivateRoomSchema = z.object({
  roomName: z.string(),
  roomPassword: z.string(),
});

export const CreatePrivateRoomPopupEventSchema = z.object({
  eventType: z.literal(PopupEventType.CREATE_PRIVATE_ROOM),
  eventData: PrivateRoomSchema,
});

export type PrivateRoomSchema = z.infer<typeof PrivateRoomSchema>;
export type CreatePrivateRoomPopupEventSchema = z.infer<typeof CreatePrivateRoomPopupEventSchema>;

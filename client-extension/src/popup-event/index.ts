import { z } from "zod";
import { CreatePrivateRoomPopupEventSchema } from "./create-private-room";
import { JoinPrivateRoomPopupEventSchema } from "./join-private-room";

export * from "./create-private-room";
export * from "./popup-event-type";

export const PopupEventUnionSchema = z.union([
  CreatePrivateRoomPopupEventSchema,
  JoinPrivateRoomPopupEventSchema,
]);

export type PopupEventUnionSchema = z.infer<typeof PopupEventUnionSchema>;

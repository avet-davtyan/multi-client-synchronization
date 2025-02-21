import { z } from "zod";

export enum PopupEventType {
  CREATE_PRIVATE_ROOM = "CREATE_PRIVATE_ROOM",
  JOIN_PRIVATE_ROOM = "JOIN_PRIVATE_ROOM",
}

export const PopupEventTypeEnum = z.nativeEnum(PopupEventType);
export type PopupEventTypeEnum = z.infer<typeof PopupEventTypeEnum>;

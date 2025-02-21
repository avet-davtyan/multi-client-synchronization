import { z } from "zod";

export enum RoomVisibilityType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export const RoomVisibilityTypeEnum = z.nativeEnum(RoomVisibilityType);
export type RoomVisibilityTypeEnum = z.infer<typeof RoomVisibilityTypeEnum>;

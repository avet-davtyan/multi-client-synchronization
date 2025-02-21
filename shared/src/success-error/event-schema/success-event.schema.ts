import { z } from "zod";
import { EventType } from "../../event-type";

export const SuccessEventDataSchema = z.object({
  silent: z.boolean(),
  message: z.string().optional().nullable(),
});

export const SuccessEventSchema = z.object({
  eventType: z.literal(EventType.SUCCESS),
  eventData: SuccessEventDataSchema,
});

export type SuccessEventSchema = z.infer<typeof SuccessEventSchema>;
export type SuccessEventDataSchema = z.infer<typeof SuccessEventDataSchema>;

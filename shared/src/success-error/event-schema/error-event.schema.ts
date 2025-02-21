import { z } from "zod";
import { EventType } from "../../event-type";

export const ErrorEventDataSchema = z.object({
  silent: z.boolean(),
  message: z.string().optional().nullable(),
});

export const ErrorEventSchema = z.object({
  eventType: z.literal(EventType.ERROR),
  eventData: ErrorEventDataSchema,
});

export type ErrorEventSchema = z.infer<typeof ErrorEventSchema>;
export type ErrorEventDataSchema = z.infer<typeof ErrorEventDataSchema>;

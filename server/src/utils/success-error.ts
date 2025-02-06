import {
  ErrorEventSchema,
  EventType,
  SuccessEventSchema,
} from "@multi-client-sync/shared";

export function successEvent(
  message?: string
): SuccessEventSchema {

  const successEvent: SuccessEventSchema = {
    eventType: EventType.SUCCESS,
    eventData: {
      message
    }
  };

  return successEvent;
}

export function errorEvent(
  message?: string
): ErrorEventSchema {

  const successEvent: ErrorEventSchema = {
    eventType: EventType.ERROR,
    eventData: {
      message
    }
  };

  return successEvent;
}

export type SuccessOrError = SuccessEventSchema | ErrorEventSchema;

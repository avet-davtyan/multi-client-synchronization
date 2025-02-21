import {
  ErrorEventSchema,
  EventType,
  SuccessEventSchema,
} from "@multi-client-sync/shared";
import {
  IErrorEventOptions,
  ISuccessEventOptions,
} from "./types";

export function successEvent(
  options: ISuccessEventOptions,
): SuccessEventSchema {

  const {
    silent,
    message,
  } = options;

  const successEvent: SuccessEventSchema = {
    eventType: EventType.SUCCESS,
    eventData: {
      silent,
      message
    }
  };

  return successEvent;
}

export function errorEvent(
  options: IErrorEventOptions,
): ErrorEventSchema {

  const {
    silent,
    message,
  } = options;

  const successEvent: ErrorEventSchema = {
    eventType: EventType.ERROR,
    eventData: {
      silent,
      message
    }
  };

  return successEvent;
}

export type SuccessOrError = SuccessEventSchema | ErrorEventSchema;

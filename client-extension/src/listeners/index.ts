import {
  MouseClickEventListenerPair,
  mouseClickEventListenerPair,
} from "./mouse";

export * from "./mouse";

type EventListenerPairUnion = MouseClickEventListenerPair;

export const eventListenerPairs: EventListenerPairUnion[] = [
  mouseClickEventListenerPair,
];

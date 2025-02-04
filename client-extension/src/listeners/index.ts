import {
  mouseClickEventListenerPair,
} from "./mouse";
import {
  createRoomButtonClickEventListenerPair,
} from "./room";

export * from "./mouse";

export const eventListenerPairs = [
  mouseClickEventListenerPair,
  createRoomButtonClickEventListenerPair,
];

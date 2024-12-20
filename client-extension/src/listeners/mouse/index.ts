import { DocumentEventType } from "../../document-event";
import { mouseClickEvnetListener } from "./mouse-click-event.listener";

export type MouseClickEventListenerPair = [DocumentEventType.CLICK, (event: MouseEvent) => void];
export const mouseClickEventListenerPair: MouseClickEventListenerPair = [
  DocumentEventType.CLICK,
  mouseClickEvnetListener,
];


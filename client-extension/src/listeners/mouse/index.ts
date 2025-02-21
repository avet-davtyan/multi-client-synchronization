import { DocumentEventType } from "../../document-event";
import { mouseClickEvnetListener } from "./mouse-click-event.listener";
import { mouseMoveEventListener } from "./mouse-move-event.listener";

export type MouseClickEventListenerPair = {
    htmlElement: Document;
    documentEventType: DocumentEventType.CLICK;
    listener: (event: MouseEvent) => void;
};

export type MouseMoveEventListenerPair = {
  htmlElement: Document;
  documentEventType: DocumentEventType.MOUSE_MOVE;
  listener: (event: MouseEvent) => void;
}

export const mouseClickEventListenerPair: MouseClickEventListenerPair = {
  htmlElement: document,
  documentEventType: DocumentEventType.CLICK,
  listener: mouseClickEvnetListener,
}

export const mouseMoveEventListenerPair: MouseMoveEventListenerPair = {
  htmlElement: document,
  documentEventType: DocumentEventType.MOUSE_MOVE,
  listener: mouseMoveEventListener,
}

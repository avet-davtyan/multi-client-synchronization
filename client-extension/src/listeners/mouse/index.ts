import { DocumentEventType } from "../../document-event";
import { mouseClickEvnetListener } from "./mouse-click-event.listener";

export type MouseClickEventListenerPair = {
    htmlElement: Document;
    documentEventType: DocumentEventType.CLICK;
    listener: (event: MouseEvent) => void;
};

export const mouseClickEventListenerPair: MouseClickEventListenerPair = {
  htmlElement: document,
  documentEventType: DocumentEventType.CLICK,
  listener: mouseClickEvnetListener,
}

import { DocumentEventType } from "../../document-event";
import { createRoomButtonEvnetListener } from "./create-room-button-click-event.listener";

export type CreateRoomButtonClickEventListenerPair = {
    htmlElement: HTMLFormElement,
    documentEventType: DocumentEventType.SUBMIT,
    listener: (event: SubmitEvent) => void,
};

const htmlForm = document.getElementById("html-form-id") as HTMLFormElement;

export const createRoomButtonClickEventListenerPair: CreateRoomButtonClickEventListenerPair = {
  htmlElement: htmlForm,
  documentEventType: DocumentEventType.SUBMIT,
  listener: createRoomButtonEvnetListener,
}

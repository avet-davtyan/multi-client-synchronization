import {
  CreatePrivateRoomPopupEventSchema,
  PopupEventType,
} from "./popup-event";

const htmlForm = document.getElementById("createRoomForm") as HTMLFormElement;

console.log(htmlForm);

const createRoomEvent: CreatePrivateRoomPopupEventSchema = {
  eventType: PopupEventType.CREATE_PRIVATE_ROOM,
  eventData: {
    roomName: "room-name-001",
    roomPassword: "room-password-001",
  }
}

htmlForm.addEventListener("submit", (event) => {

  event.preventDefault();

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id && htmlForm) {
      console.log("chrome tabs");
      chrome.tabs.sendMessage(tabs[0].id, createRoomEvent);
    }
  });
})

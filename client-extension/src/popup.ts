import { CreateRoomEventSchema, EventType, RoomVisibilityType } from "@multi-client-sync/shared";

const htmlForm = document.getElementById("createRoomForm") as HTMLFormElement;

console.log(htmlForm);

const createRoomEvent: CreateRoomEventSchema = {
  eventType: EventType.CREATE_ROOM,
  eventData: {
    roomVisibilityType: RoomVisibilityType.PRIVATE,
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

import {
  eventListenerPairs,
  MouseClickEventListenerPair,
} from "./listeners";
import {
  CreateRoomButtonClickEventListenerPair,
} from "./listeners/room";
import {
  SocketService,
} from "./modules";

function main(){

  const socketService = SocketService.getInstance();

  for(const eventListenerPair of eventListenerPairs as (CreateRoomButtonClickEventListenerPair | MouseClickEventListenerPair)[]) {
    const {
      htmlElement,
      documentEventType,
      listener,
    } = eventListenerPair;

    // NOTE: This approach uses type assertion for adding event listeners, which bypasses type checking.
    // This is a temporary solution, and a more type-safe approach should be explored later.
    htmlElement.addEventListener(documentEventType, listener as EventListener);
  }

  socketService.webSocket.addEventListener("message", (event) => {

    console.log("recieved message");
    const recievedData = JSON.parse(event.data);

    console.log({recievedData});
  })

}

main();

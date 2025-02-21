import {
  eventListenerPairs,
} from "./listeners";
import {
  SocketService,
  PopupEventHandler,
} from "./modules";

function main(){

  const popupEventHandler = PopupEventHandler.getInstance();
  const socketService = SocketService.getInstance();

  for(const eventListenerPair of eventListenerPairs) {
    const {
      htmlElement,
      documentEventType,
      listener,
    } = eventListenerPair;

    // NOTE: This approach uses type assertion for adding event listeners, which bypasses type checking.
    // This is a temporary solution, and a more type-safe approach should be explored later.
    htmlElement.addEventListener(documentEventType, listener as EventListener);
  }

}

main();

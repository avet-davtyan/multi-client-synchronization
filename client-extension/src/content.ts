import { EventUnionSchema } from "@multi-client-sync/shared";
import {
  eventListenerPairs,
} from "./listeners";
import {
  SocketService,
} from "./modules";
import { EventHandler } from "./modules/popup-event-handler.ts/popup-event-handler";

function main(){

  const popupEventHandler = EventHandler.getInstance();
  const socketService = SocketService.getInstance();
  //NOTE: move this to event handler
  socketService.webSocket.addEventListener("message", async (event: any) => {

    const recievedData = JSON.parse(event.data);

    let eventUnion: undefined | EventUnionSchema = undefined;

    try {
      eventUnion = await EventUnionSchema.parseAsync(recievedData);
    } catch {
      console.error("can't parse event");
    }

    console.log(eventUnion);
  })

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

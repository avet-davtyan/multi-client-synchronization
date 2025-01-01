import { eventListenerPairs } from "./listeners";
import { SocketService } from "./modules";

function main(){

  const socketService = SocketService.getInstance();

  for(const eventListenerPair of eventListenerPairs) {
    const [
      documentEventType,
      listener,
    ] = eventListenerPair;
    document.addEventListener(documentEventType, listener);
  }

  socketService.webSocket.addEventListener("message", (event) => {

    console.log("recieved message");
    const recievedData = JSON.parse(event.data);

    console.log({recievedData});
  })

}

main();

import { eventListenerPairs } from "./listeners";
const socket = new WebSocket("ws://localhost:6062");

for(const eventListenerPair of eventListenerPairs) {

  const [
    documentEventType,
    listener,
  ] = eventListenerPair;

  document.addEventListener(documentEventType, listener);
}

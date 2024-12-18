import { pipelieList } from ".";
const socket = new WebSocket("ws://localhost:6062");


socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server on port 6062");
});


for(const pipeline of pipelieList) {

  const [
    documentEventType,
    listenerPipeline,
  ] = pipeline;

  document.addEventListener(documentEventType, listenerPipeline.listener);
}

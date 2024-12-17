import { mouseClickEventListener } from "./mouse-click-event-listener";

const socket = new WebSocket("ws://localhost:6062");


socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server on port 6062");
});

document.addEventListener("click", mouseClickEventListener);

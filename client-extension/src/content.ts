const socket = new WebSocket("ws://localhost:6062");


socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server on port 6062");
});

document.addEventListener("click", (event: MouseEvent) => {
  if(!event.isTrusted) {
    return;
  }
  const target = event.target as HTMLElement;

  const minimalEvent = {
    type: event.type,
    id: target.id || null,
    tag: target.tagName.toLowerCase(),
    class: target.className,
    dataId: target.getAttribute("data-id") || null,
    timestamp: Date.now(),
  };

  socket.send(JSON.stringify({ type: "click-event", data: minimalEvent }));

 
});

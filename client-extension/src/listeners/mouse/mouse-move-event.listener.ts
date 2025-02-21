import { SocketService } from "../../modules";
import { MouseService } from "../../modules/mouse";

export async function mouseMoveEventListener(event: MouseEvent) {
  const mouseService = MouseService.getInstance();
  const socketService = SocketService.getInstance();

  if (event.isTrusted) {
    const mouseMoveEvent = await mouseService.generateMouseMoveEvent(event);
    socketService.sendEvent(mouseMoveEvent);
  }
}

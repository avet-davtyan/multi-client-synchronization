import { SocketService } from "../../modules";
import { MouseClickService } from "../../modules/mouse";

export async function mouseClickEvnetListener(event: MouseEvent) {
  const mouseService = MouseClickService.getInstance();
  const socketService = SocketService.getInstance();

  if(event.isTrusted === true) {
    const mouseClickEvent = await mouseService.generateMouseClickEvent(event);
    socketService.sendEvent(mouseClickEvent);
  }
}

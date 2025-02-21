import { SocketService } from "../../modules";
import { MouseService } from "../../modules/mouse";

export async function mouseClickEvnetListener(event: MouseEvent) {
  const mouseService = MouseService.getInstance();
  const socketService = SocketService.getInstance();

  if(event.isTrusted === true) {
    const mouseClickEvent = await mouseService.generateMouseClickEvent(event);
    socketService.sendEvent(mouseClickEvent);
  }
}

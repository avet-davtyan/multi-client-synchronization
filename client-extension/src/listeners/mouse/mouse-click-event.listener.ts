import { SocketService } from "../../modules";
import { MouseClickService } from "../../modules/mouse";

export async function mouseClickEvnetListener(event: MouseEvent) {
  const mouseService = MouseClickService.getInstance();
  const socketService = SocketService.getInstance();

  const mouseClickEvent = await mouseService.generateMouseClickEvent(event);

  console.log(mouseClickEvent);

  socketService.sendEvent(mouseClickEvent);
}

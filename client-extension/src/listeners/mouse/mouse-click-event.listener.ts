import { MouseClickService } from "../../modules/mouse";

export function mouseClickEvnetListener(event: MouseEvent) {
  const mouseService = MouseClickService.getInstance();
  mouseService.sendMouseClickEvent(event);
}

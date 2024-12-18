import {
  ListenerPipeline,
} from "../../listener-pipeline";
import {
  mouseClickEventListener,
} from "./mouse-click-event-listener";

export const mouseClickEventListenerPipeline = new ListenerPipeline(mouseClickEventListener)

mouseClickEventListenerPipeline.use((event: MouseEvent) => {
  console.log("middleware 1");
  return event;
})

mouseClickEventListenerPipeline.use((event: MouseEvent) => {
  console.log("middleware 2");
  return event;
})

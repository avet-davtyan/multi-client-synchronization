import { DocumentEventType } from "../document-event";
import { ListenerPipeline } from "../listener-pipeline";
import { mouseClickEventListenerPipeline } from "./mouse-click-event";

export type PipelineMouseClick = [DocumentEventType.CLICK, ListenerPipeline<MouseEvent>];

export const mouseClickEventPipeLinelist: PipelineMouseClick[] = [
  [DocumentEventType.CLICK, mouseClickEventListenerPipeline],
];

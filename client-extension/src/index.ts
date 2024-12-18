import {
  mouseClickEventPipeLinelist,
  PipelineMouseClick,
} from "./events"

type PipelineListUnion = PipelineMouseClick;

export const pipelieList: PipelineListUnion[] = [
  ...mouseClickEventPipeLinelist,
];

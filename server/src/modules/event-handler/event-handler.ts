import { EventType, EventUnionSchema, MouseClickEventSchema } from "@multi-client-sync/shared";

export class EventHandler {

  public static instance: EventHandler;

  public constructor() {
  }

  public static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }
    return EventHandler.instance;
  }

  async handleEvent(event: EventUnionSchema) {
    if(event.eventType === EventType.MOUSE_CLICK) {
      this.handeMouseClickEvent(event);
    }
    else if(event.eventType === EventType.CREATE_ROOM) {
      //handle room creation
    }
  }

  private async handeMouseClickEvent(mouseClickEvent: MouseClickEventSchema) {
    console.log("mouse click", mouseClickEvent);
  }

}

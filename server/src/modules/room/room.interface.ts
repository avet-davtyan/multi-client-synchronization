import { RoomVisibilityType } from "@multi-client-sync/shared";
import { WebSocket } from "ws";

interface IPrivateRoom {
  roomVisibility: RoomVisibilityType.PRIVATE;
  roomId: string;
  admin: WebSocket;
  password: string;
  participants: WebSocket[];
}

interface IPublicRoom {
  roomVisibility: RoomVisibilityType.PUBLIC;
  roomId: string;
  admin: WebSocket;
  participants: WebSocket[];
}

export type IRoom = IPrivateRoom | IPublicRoom;

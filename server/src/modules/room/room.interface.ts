import { RoomVisibilityType } from "@multi-client-sync/shared";

interface IPrivateRoom {
  roomVisibility: RoomVisibilityType.PRIVATE;
  roomId: string;
  adminSocketId: string;
  password: string;
  participantSocketIdList: string[];
}

interface IPublicRoom {
  roomVisibility: RoomVisibilityType.PUBLIC;
  roomId: string;
  adminSocketId: string;
  participantSocketIdList: string[];
}

export type IRoom = IPrivateRoom | IPublicRoom;

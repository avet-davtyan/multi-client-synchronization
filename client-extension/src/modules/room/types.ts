export interface ICreatePrivateRoomOptions {
  name: string;
  password: string;
}

export interface ICreatePublicRoomOptions {
  name: string;
}

export interface IJoinPrivateRoomOptions {
  roomId: string;
  roomPassword: string;
}

export interface IRoom {
  roomID: string;
  roomName: string;
  roomPic: string;
}

export interface IUser {
  userID: string;
  username: string;
  displayName: string;
}

export interface IUserRoom {
  userID: string;
  rooms: string[];
}

export interface IMessage {
  userID: string;
  profilePic: string;
  time: string;
  message: string;
}

export enum EUserIDs {
  XaipherSK = "user001",
  Settawut = "user002",
  Seletinar = "user003",
}

export interface IUserDatabase extends IUser {
  userProfile: string;
}

export interface ILogin {
  token: string;
  userID: string;
  username: string;
  displayName: string;
}

export interface IGetRoomListByUserID {
  _id: string;
  room_name: string;
  room_profile_pic: string;
  created_at: string;
}

export interface IGetMessageByRoomID {
  user_id: string;
  room_id: string;
  message: string;
  created_at: string;
}

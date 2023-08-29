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

export interface IMessage {
  userID: string;
  username: string;
  profilePic: string;
  time: string;
  message: string;
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
  username: string;
  room_id: string;
  message: string;
  created_at: string;
}

export interface IFetchUser {
  userID: string;
  username: string;
  displayName: string;
}

export interface IRoom {
  roomID: string;
  roomName: string;
  roomPic: string;
}

export interface IUser {
  userID: string;
  username: string;
}

export interface IUserRoom {
  userID: string;
  rooms: string[];
}

export interface IMessage {
  userID: string;
  username: string;
  profilePic: string;
  time: string;
  message: string;
}

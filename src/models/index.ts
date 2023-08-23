export interface IRoom {
  roomID: string;
  roomName: string;
  roomPic: string;
}

export interface IUser {
  userID: string;
  username: string;
}

export interface IRoomDatabase {
  users: {
    userID: string;
    username: string;
    rooms: IRoom[];
  }[];
}

export interface IMessage {
  userID: string;
  username: string;
  profilePic: string;
  time: string;
  message: string;
}

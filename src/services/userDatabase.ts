import XaiPic from "../assets/profilePic/328516851_763427891875557_961607795902390547_n.jpg";
import SelPic from "../assets/profilePic/334883541_1005132130452861_5563076368967134522_n.jpg";
import SettawutPic from "../assets/profilePic/ak47.PNG";
import defaultPic from "../assets/icons/user.png";
import { IUser } from "../models";

export enum EUserIDs {
  XaipherSK = "user001",
  Settawut = "user002",
  Seletinar = "user003",
}

interface IUserDatabase extends IUser {
  userProfile: string;
}

export const userDatabase: IUserDatabase[] = [
  {
    userID: "user001",
    username: "Xaipher SK",
    userProfile: XaiPic,
  },
  {
    userID: "user002",
    username: "Settawut SK",
    userProfile: SettawutPic,
  },
  {
    userID: "user003",
    username: "Seletinar SK",
    userProfile: SelPic,
  },
];

export function getUserByID(userID: string) {
  const user = userDatabase.find((user) => user.userID === userID);
  return user;
}

export function getUserPicByID(userID: string) {
  // const user = userDatabase.find((user) => user.userID === userID);
  return defaultPic;
}

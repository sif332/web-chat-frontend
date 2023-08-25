import { IRoom, IUser } from "./../models/index";
import { IUserRoom } from "../models";

import XaiPic from "../assets/profilePic/328516851_763427891875557_961607795902390547_n.jpg";
import SelPic from "../assets/profilePic/334883541_1005132130452861_5563076368967134522_n.jpg";
import SettawutPic from "../assets/profilePic/ak47.PNG";

export function getAllUser() {
  const userDatabase: IUser[] = [
    {
      userID: "user001",
      username: "Xaipher SK",
    },
    {
      userID: "user002",
      username: "Settawut SK",
    },
    {
      userID: "user003",
      username: "Seletinar SK",
    },
  ];
  return userDatabase;
}

export function getRoomByRoomID(roomID: string) {
  const roomDatabase: IRoom[] = [
    {
      roomID: "room001",
      roomName: "Xaipher SK",
      roomPic: XaiPic,
    },
    {
      roomID: "room002",
      roomName: "Seletinar SK",
      roomPic: SelPic,
    },
    {
      roomID: "room003",
      roomName: "Settawut SK",
      roomPic: SettawutPic,
    },
  ];
  const room = roomDatabase.find((room) => room.roomID === roomID);
  return room;
}

export function getRoomListByUserID(userID: string) {
  const roomDatabase: IUserRoom[] = [
    {
      userID: "user001",
      rooms: ["room002", "room003"],
    },
    {
      userID: "user002",
      rooms: ["room001", "room002"],
    },
    {
      userID: "user003",
      rooms: ["room001"],
    },
  ];

  const roomList = roomDatabase.find((user) => user.userID === userID)?.rooms;
  return roomList;
}

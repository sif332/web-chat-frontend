import { IRoomDatabase } from "../models";

import XaiPic from "../assets/profilePic/328516851_763427891875557_961607795902390547_n.jpg";
import SelPic from "../assets/profilePic/334883541_1005132130452861_5563076368967134522_n.jpg";
import SettawutPic from "../assets/profilePic/ak47.PNG";

export function getRoomListByUserID(userID: string) {
  const roomDatabase: IRoomDatabase = {
    users: [
      {
        userID: "user001",
        username: "Xaipher SK",
        rooms: [
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
        ],
      },
      {
        userID: "user002",
        username: "Settawut SK",
        rooms: [
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
        ],
      },
      {
        userID: "user003",
        username: "Seletinar SK",
        rooms: [
          {
            roomID: "room001",
            roomName: "Xaipher SK",
            roomPic: XaiPic,
          },
        ],
      },
    ],
  };

  const roomList = roomDatabase.users.find((user) => user.userID === userID)
    ?.rooms;
  return roomList;
}

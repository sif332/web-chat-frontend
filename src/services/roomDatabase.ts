import axios, { AxiosError } from "axios";
import { IGetRoomListByUserID } from "../types";
import defaultProfile from "../assets/icons/user.png";

export async function getRoomListByUserID(userID: string) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios<IGetRoomListByUserID[]>({
      method: "get",
      url: "http://localhost:4000/room/belong",
      headers: { Authorization: `Bearer ${token}` },
    });
    const roomList = response.data.map((room) => {
      return {
        roomID: room._id,
        roomName: room.room_name,
        roomPic: defaultProfile,
      };
    });
    console.log(roomList);
    return roomList;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      console.error("Server Error:", error.response.status);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return [];
  }
}

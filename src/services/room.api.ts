import { AxiosError } from "axios";
import { IGetRoomListByUserID } from "../types";
import defaultProfile from "../assets/icons/user.png";
import { axiosInstance } from "../libs/axios.instance";

export async function getRoomListByUserID() {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance<IGetRoomListByUserID[]>({
      method: "get",
      url: "/room/belong",
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
    throw error;
  }
}

export function createRoom(roomName: string) {
  const token = localStorage.getItem("token");
  return axiosInstance({
    method: "post",
    url: `http://localhost:4000/room/create?roomName=${roomName}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function joinRoom(roomID: string) {
  const token = localStorage.getItem("token");

  return axiosInstance({
    method: "post",
    url: `http://localhost:4000/room/join?roomID=${roomID}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

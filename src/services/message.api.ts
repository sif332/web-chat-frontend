import { IGetMessageByRoomID } from "../types";
import { axiosInstance } from "../libs/axios.instance";

export function getMessagesByRoomID(roomID: string) {
  const token = localStorage.getItem("token");

  return axiosInstance<IGetMessageByRoomID[]>({
    method: "get",
    url: `/message/by-roomid?roomID=${roomID}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function sendMessage(roomID: string, message: string) {
  const token = localStorage.getItem("token");
  const axiosPayload = {
    message: message,
  };
  return axiosInstance({
    method: "post",
    url: `/message/by-roomid?roomID=${roomID}`,
    headers: { Authorization: `Bearer ${token}` },
    data: axiosPayload,
  });
}

import { IGetMessageByRoomID } from "../types";
import axios, { AxiosError } from "axios";
import defaultProfile from "../assets/icons/user.png";

export async function getMessageByRoomID(roomID: string) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios<IGetMessageByRoomID[]>({
      method: "get",
      url: `http://localhost:4000/message/by-roomid?roomID=${roomID}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    const messages = response.data.map((message) => {
      return {
        userID: message.user_id,
        profilePic: defaultProfile,
        time: message.created_at,
        message: message.message,
      };
    });
    console.log(messages);
    return messages;
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

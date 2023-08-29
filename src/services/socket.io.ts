import { io } from "socket.io-client";

const baseURL = process.env.REACT_APP_BASEURL ?? "http://192.168.1.33:4000";

export const webChatSocket = io(baseURL, {
  autoConnect: false,
});

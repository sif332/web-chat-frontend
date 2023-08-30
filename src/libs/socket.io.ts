import { io } from "socket.io-client";

const baseURL =
  process.env.REACT_APP_BASEURL ?? "https://webchat-backend.xaiphersk.com";

export const webChatSocket = io(baseURL!, {
  autoConnect: false,
  transports: ["websocket"]
});

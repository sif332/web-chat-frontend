import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "../models";

const initialRoom = {
  roomID: "",
  roomName: "",
  roomPic: "",
};

const chatRoomSlice = createSlice({
  name: "room",
  initialState: {
    currentRoom: initialRoom,
    isShowChatBar: false,
  },
  reducers: {
    setRoom(state, action: PayloadAction<IRoom>) {
      const newRoom = action.payload;
      state.currentRoom = newRoom;
      if (!state.isShowChatBar) {
        state.isShowChatBar = true;
      }
    },
  },
});

export const { setRoom } = chatRoomSlice.actions;
export default chatRoomSlice;

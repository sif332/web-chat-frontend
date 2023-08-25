import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "../models";

const initialRoom: IRoom = {
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
    setShowChatBar(state, action: PayloadAction<boolean>) {
      state.isShowChatBar = false;
    },
  },
});

export const { setRoom, setShowChatBar } = chatRoomSlice.actions;
export default chatRoomSlice;

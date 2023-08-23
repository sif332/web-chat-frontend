import { configureStore } from "@reduxjs/toolkit";
import tabBarSlice from "./tabBarSlice";
import userSlice from "./userSlice";
import chatRoomSlice from "./chatRoomSlice";

export const store = configureStore({
  reducer: {
    tabBar: tabBarSlice.reducer,
    user: userSlice.reducer,
    room: chatRoomSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

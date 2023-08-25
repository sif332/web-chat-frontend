import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models";

const initialState: IUser = {
  userID: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const newUser = action.payload;
      state.userID = newUser.userID;
      state.username = newUser.username;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;

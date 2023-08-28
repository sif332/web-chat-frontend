import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";

const initialState: IUser = {
  userID: "",
  username: "",
  displayName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const newUser = action.payload;
      state.userID = newUser.userID;
      state.username = newUser.username;
      state.displayName = newUser.displayName;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;

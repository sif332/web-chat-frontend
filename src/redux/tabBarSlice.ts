import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ETabBar {
  chat,
  friend,
}

const tabBarSlice = createSlice({
  name: "tabBar",
  initialState: { currentTab: ETabBar.chat },
  reducers: {
    setTabBar(state, action: PayloadAction<ETabBar>) {
      const newTabBar = action.payload;
      state.currentTab = newTabBar;
    },
  },
});

export const { setTabBar } = tabBarSlice.actions;
export default tabBarSlice;

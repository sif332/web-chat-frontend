import React from "react";
import ChatTab from "./ChatTab";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { ETabBar } from "../../../redux/tabBarSlice";
import FriendTab from "./FriendTab";

export default function TabBar() {
  const currentTab = useSelector((state: RootState) => state.tabBar.currentTab);
  return (
    <div className="w-80 shrink-0 bg-[#262626]">
      {currentTab === ETabBar.chat && <ChatTab />}
      {currentTab === ETabBar.friend && <FriendTab />}
    </div>
  );
}

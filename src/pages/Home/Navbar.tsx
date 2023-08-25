import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ETabBar, setTabBar } from "../../redux/tabBarSlice";
import { RootState } from "../../redux";

import Icons from "../../components/Icon";
import chatWhite from "../../assets/icons/chat-white.png";
import chatRed from "../../assets/icons/chat-red.png";
import friendsWhite from "../../assets/icons/friend-white.png";
import friendsRed from "../../assets/icons/friend-red.png";
import settingWhite from "../../assets/icons/setting-white.svg";
import settingRed from "../../assets/icons/setting-red.svg";
import { getUserPicByID } from "../../services/userDatabase";

export default function Navbar() {
  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="flex w-20 shrink-0 flex-col items-center justify-between bg-[#2e2e2e]">
      <div className="m-2 flex flex-col gap-8">
        <Icons
          icon={chatWhite}
          hoverIcon={chatRed}
          name="chatIcon"
          onClick={() => {
            dispatch(setTabBar(ETabBar.chat));
          }}
        />
        <Icons
          icon={friendsWhite}
          hoverIcon={friendsRed}
          name="friendIcon"
          onClick={() => {
            dispatch(setTabBar(ETabBar.friend));
          }}
        />
        <Icons icon={settingWhite} hoverIcon={settingRed} name="settingIcon" />
      </div>
      <div className="m-2 flex flex-col">
        <img
          className="h-[45px] w-[45px] rounded-full object-cover"
          src={getUserPicByID(currentUser.userID)}
          alt={currentUser.userID + "profilePic"}
        />
      </div>
    </div>
  );
}

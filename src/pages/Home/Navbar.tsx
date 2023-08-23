import React from "react";
import Icons from "../../components/Icons";
import chatWhite from "../../assets/icons/chat-white.png";
import chatRed from "../../assets/icons/chat-red.png";
import friendsWhite from "../../assets/icons/friend-white.png";
import friendsRed from "../../assets/icons/friend-red.png";
import settingWhite from "../../assets/icons/setting-white.svg";
import settingRed from "../../assets/icons/setting-red.svg";
import profile from "../../assets/icons/user.png";

export default function Navbar() {
  return (
    <div className="flex w-20 shrink-0 flex-col items-center justify-between bg-[#2e2e2e]">
      <div className="m-2 flex flex-col gap-8">
        <Icons icon={chatWhite} hoverIcon={chatRed} name="chatIcon" />
        <Icons icon={friendsWhite} hoverIcon={friendsRed} name="friendIcon" />
        <Icons icon={settingWhite} hoverIcon={settingRed} name="settingIcon" />
      </div>
      <div className="m-2 flex flex-col">
        <Icons icon={profile} name="profileIcon" />
      </div>
    </div>
  );
}

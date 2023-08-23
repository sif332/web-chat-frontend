import React from "react";
import { getRoomListByUserID } from "../../../services/roomDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DireactMessageRoomList from "./DireactMessageRoomList";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

export default function ChatTab() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between p-4">
        <h5>Chats</h5>
        <button className="h-[28px] w-[28px] rounded-md bg-red-500 bg-opacity-20 text-red-500 transition-all ease-out hover:bg-opacity-100 hover:text-white">
          <FontAwesomeIcon className="text-white" icon={solid("plus")} />
        </button>
      </div>
      <div>
        <p className=" p-4 text-sm font-light">Direct Message</p>
        <DireactMessageRoomList roomList={getRoomListByUserID(user.userID)!} />
      </div>
    </div>
  );
}

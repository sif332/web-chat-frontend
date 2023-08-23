import React from "react";
import {
  direactMessageUserList,
  IDireactMessageUserList,
} from "../../../data/direactMessageUserList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface IProp {
  userList: IDireactMessageUserList;
}

function DireactMessageUserList({ userList }: IProp) {
  return (
    <>
      {userList.users.map((user, index) => {
        return (
          <div className="mb-4 flex items-center" key={index}>
            <img
              className="mr-2 h-[28px] w-[28px]"
              src={user.profilePic}
              alt={user.username}
            />
            <p>{user.username}</p>
          </div>
        );
      })}
    </>
  );
}

export default function ChatTab() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between p-4">
        <h5>Chats</h5>
        <button className="h-[28px] w-[28px] rounded-md bg-red-500 bg-opacity-20 text-red-500 transition-all ease-out hover:bg-opacity-100 hover:text-white">
          <FontAwesomeIcon className="text-white" icon={solid("plus")} />
        </button>
      </div>
      <div className="p-4">
        <p className="mb-3 text-sm font-light">Direct Message</p>
        <DireactMessageUserList userList={direactMessageUserList} />
      </div>
    </div>
  );
}

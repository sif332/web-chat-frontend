import React, { useState } from "react";
import { getRoomListByUserID } from "../../../services/roomDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DireactMessage from "./DireactMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import Modal from "../../../components/Modal";
import AddRoomModal from "./AddRoomModal";

export default function ChatTab() {
  const user = useSelector((state: RootState) => state.user);
  const [isShow, setShow] = useState(false);
  function joinRoom(roomID: string) {
    console.log("roomID", roomID);
  }
  function createRoom(roomName: string) {
    console.log("roomName", roomName);
  }
  return (
    <div className="flex w-full flex-col">
      <Modal
        isShow={isShow}
        tailwindWidth={"w-[300px]"}
        tailwindHeight={"h-[300px]"}
      >
        <AddRoomModal
          onCreate={createRoom}
          onJoin={joinRoom}
          onClose={() => {
            setShow(false);
          }}
        />
      </Modal>

      <div className="flex items-center justify-between p-4">
        <h5>Chats</h5>
        <button
          onClick={() => {
            setShow(true);
          }}
          className="h-[28px] w-[28px] rounded-md bg-red-500 bg-opacity-20 text-red-500 transition-all ease-out hover:bg-opacity-100 hover:text-white"
        >
          <FontAwesomeIcon className="text-white" icon={solid("plus")} />
        </button>
      </div>
      <div>
        <p className=" p-4 text-sm font-light">Direct Message</p>
        {user.userID && (
          <DireactMessage roomList={getRoomListByUserID(user.userID)!} />
        )}
      </div>
    </div>
  );
}

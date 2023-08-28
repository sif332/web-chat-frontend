import React, { useState, useEffect } from "react";
import { getRoomListByUserID } from "../../../services/roomDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DireactMessage from "./DireactMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import Modal from "../../../components/Modal";
import AddRoomModal from "./AddRoomModal";
import { IRoom } from "../../../types";
import axios from "axios";

export default function ChatTab() {
  const user = useSelector((state: RootState) => state.user);
  const [isShow, setShow] = useState(false);
  const [roomList, setRoomList] = useState<IRoom[]>([]);

  useEffect(() => {
    if (user.userID) {
      getRoomListByUserID(user.userID).then((rooms) => {
        setRoomList(rooms);
      });
    }
  }, [user.userID]);

  function joinRoom(roomID: string) {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `http://localhost:4000/room/join?roomID=${roomID}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.response) {
          console.error("Server Error:", error.response.status);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  }
  function createRoom(roomName: string) {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `http://localhost:4000/room/create?roomName=${roomName}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.response) {
          console.error("Server Error:", error.response.status);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
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
      {user.userID && (
        <div>
          <p className=" p-4 text-sm font-light">Direct Message</p>
          <DireactMessage roomList={roomList} />
        </div>
      )}
    </div>
  );
}

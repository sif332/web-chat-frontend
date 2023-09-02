import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DireactMessage from "./DireactMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import Modal from "../../../components/Modal";
import AddRoomModal from "./AddRoomModal";
import { IRoom } from "../../../types";
import {
  createRoom,
  getRoomListByUserID,
  joinRoom,
} from "../../../services/room.api";
import { AxiosError } from "axios";

export default function ChatTab() {
  const user = useSelector((state: RootState) => state.user);
  const [isShow, setShow] = useState(false);
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (user.userID) {
      getRoomListByUserID().then((rooms) => {
        setRoomList(rooms);
      });
    }
  }, [user, isSuccess]);

  async function createRoomHandle(
    roomName: string,
    successHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      setLoading(true);
      await createRoom(roomName);
      setLoading(false);
      successHandle();
      setSuccess((prev) => !prev);
    } catch (err) {
      setLoading(false);
      setError(true);
      const error = err as AxiosError;
      if (error.response) {
        console.error("Server Error:", error.response);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  async function joinRoomHandle(
    roomID: string,
    successHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      setLoading(true);
      await joinRoom(roomID);
      setLoading(false);
      successHandle();
      setSuccess((prev) => !prev);
    } catch (err) {
      setLoading(false);
      setError(true);
      const error = err as AxiosError;
      if (error.response) {
        console.error("Server Error:", error.response);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <Modal
        isShow={isShow}
        tailwindWidth={"w-[300px]"}
        tailwindHeight={"h-[300px]"}
      >
        <AddRoomModal
          onCreate={createRoomHandle}
          onJoin={joinRoomHandle}
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

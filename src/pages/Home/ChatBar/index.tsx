import React, { useEffect, useState } from "react";
import ChatTopBar from "./ChatTopBar";
import Message from "./Message";
import TextFieldBar from "./TextFieldBar";
import { getMessageByRoomID } from "../../../services/messageDatabase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IMessage, IRoom } from "../../../types";
import axios from "axios";

interface IProps {
  currentRoom: IRoom;
}

export default function ChatBar({ currentRoom }: IProps) {
  const user = useSelector((state: RootState) => state.user);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const isShowChatBar = useSelector(
    (state: RootState) => state.room.isShowChatBar,
  );

  function sendMessageHanle(message: string) {
    const token = localStorage.getItem("token");
    const axiosBody = {
      message: message,
    };
    axios
      .post(
        `http://localhost:4000/message/by-roomid?roomID=${currentRoom.roomID}`,
        axiosBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
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

  useEffect(() => {
    if (isShowChatBar) {
      getMessageByRoomID(currentRoom.roomID).then((messages) => {
        setMessageList(messages);
      });
    }
  }, [currentRoom.roomID, isShowChatBar]);

  return (
    <div className="relative flex grow flex-col bg-[#2e2e2e]">
      {isShowChatBar ? (
        <>
          <ChatTopBar room={currentRoom} />
          <div className="flex w-full grow flex-col-reverse overflow-y-auto bg-[#252525] pt-24 shadow-inner">
            {messageList.map((message, index) => {
              return (
                <Message key={index} userID={user.userID} message={message} />
              );
            })}
          </div>
          <TextFieldBar onSend={sendMessageHanle} />
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <h1 className="mb-2">Welcome</h1>
          <p>Please select a chat room</p>
        </div>
      )}
    </div>
  );
}

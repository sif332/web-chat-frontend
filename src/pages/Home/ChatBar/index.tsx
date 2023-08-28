import React, { useEffect, useState } from "react";
import ChatTopBar from "./ChatTopBar";
import Message from "./Message";
import TextFieldBar from "./TextFieldBar";
import {
  getMessagesByRoomID,
  sendMessage,
} from "../../../services/message.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IMessage, IRoom } from "../../../types";
import { AxiosError } from "axios";
import defaultProfile from "../../../assets/icons/user.png";

interface IProps {
  currentRoom: IRoom;
}

export default function ChatBar({ currentRoom }: IProps) {
  const user = useSelector((state: RootState) => state.user);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const isShowChatBar = useSelector(
    (state: RootState) => state.room.isShowChatBar,
  );
  const [isSend, setSend] = useState(false);

  async function sendMessageHandle(message: string) {
    try {
      await sendMessage(currentRoom.roomID, message);
      setSend((prev) => !prev);
    } catch (err) {
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

  useEffect(() => {
    if (isShowChatBar) {
      getMessagesByRoomID(currentRoom.roomID).then((response) => {
        const messages: IMessage[] = response.data.map((message) => {
          return {
            userID: message.user_id,
            username: message.username,
            profilePic: defaultProfile,
            time: message.created_at,
            message: message.message,
          };
        });
        setMessageList(messages);
      });
    }
  }, [currentRoom.roomID, isShowChatBar, isSend]);

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
          <TextFieldBar onSend={sendMessageHandle} />
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

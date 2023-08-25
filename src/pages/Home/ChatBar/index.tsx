import React from "react";
import ChatTopBar from "./ChatTopBar";
import Message from "./Message";
import TextFieldBar from "./TextFieldBar";
import { getMessageByRoomID } from "../../../services/messageDatabase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IRoom } from "../../../models";

interface IProps {
  currentRoom: IRoom;
}

export default function ChatBar({ currentRoom }: IProps) {
  const user = useSelector((state: RootState) => state.user);

  const isShowChatBar = useSelector(
    (state: RootState) => state.room.isShowChatBar,
  );

  function sendMessageHanle(message: string) {
    console.log("message", message);
  }

  return (
    <div className="relative flex grow flex-col bg-[#2e2e2e]">
      {isShowChatBar ? (
        <>
          <ChatTopBar room={currentRoom} />
          <div className="flex w-full grow flex-col-reverse overflow-y-auto bg-[#252525] pt-24 shadow-inner">
            {getMessageByRoomID(
              currentRoom.roomID,
              user.userID,
              user.username,
            ).messages.map((message, index) => {
              return (
                <Message
                  key={index}
                  username={user.username}
                  message={message}
                />
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

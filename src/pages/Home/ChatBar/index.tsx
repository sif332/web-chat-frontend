import React from "react";
import ChatTopBar from "./ChatTopBar";
import Message from "./Message";
import TextFieldBar from "./TextFieldBar";
import { getMessageByRoomID } from "../../../services/messageDatabase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

export default function ChatBar() {
  const user = useSelector((state: RootState) => state.user);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const isShowChatBar = useSelector(
    (state: RootState) => state.room.isShowChatBar,
  );
  return (
    <div className="flex grow flex-col bg-[#2e2e2e]">
      {isShowChatBar && (
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
          <TextFieldBar />
        </>
      )}
    </div>
  );
}

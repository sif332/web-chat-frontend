import React from "react";
import ChatTopBar from "./ChatTopBar";
import Message from "./Message";
import TextFieldBar from "./TextFieldBar";
import { getDemoMessage } from "../../../data/direactMessageList";

export default function ChatBar() {
  const username = "Xaipher SK";
  const demoData = getDemoMessage();
  return (
    <div className="flex grow flex-col bg-[#2e2e2e]">
      <ChatTopBar username={username} />
      <div className="flex w-full grow flex-col-reverse overflow-y-auto bg-[#252525] pt-24 shadow-inner">
        {demoData.messages.map((message, index) => {
          console.log(message.time);
          return <Message key={index} username={username} message={message} />;
        })}
      </div>
      <TextFieldBar />
    </div>
  );
}

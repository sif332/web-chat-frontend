import React from "react";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import ChatBar from "./ChatBar";

export default function Home() {
  return (
    <div className="flex h-screen w-full text-[#b5b5b4]">
      <Navbar />
      <TabBar />
      <ChatBar />
    </div>
  );
}

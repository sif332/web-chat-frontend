import React, { useState } from "react";
import ChatTab from "./ChatTab";

export enum ETab {
  Chat,
  Setting,
}

export default function TabBar() {
  const [tab, setTabe] = useState(ETab.Chat);
  return (
    <div className="w-80 shrink-0 bg-[#262626]">
      {tab === ETab.Chat && <ChatTab />}
    </div>
  );
}

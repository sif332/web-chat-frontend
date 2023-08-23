import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function FriendTab() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between p-4">
        <h5>Friends</h5>
        <button className="h-[28px] w-[28px] rounded-md bg-red-500 bg-opacity-20 text-red-500 transition-all ease-out hover:bg-opacity-100 hover:text-white">
          <FontAwesomeIcon className="text-white" icon={solid("plus")} />
        </button>
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRoom, setShowChatBar } from "../../../redux/chatRoomSlice";
import { IRoom } from "../../../types";

interface IProps {
  room: IRoom;
}

export default function ChatTopBar({ room }: IProps) {
  const [isHover, setHover] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="absolute w-full border-b border-gray-800 bg-[#2e2e2e] bg-opacity-30 backdrop-blur-lg backdrop-filter">
      <div className="flex w-full items-center justify-between">
        <div className="flex shrink-0 items-center p-4">
          <img
            className="mr-2 h-[45px] w-[45px] rounded-full"
            src={room.roomPic}
            alt="DemonUser"
          />
          <div className="flex flex-col">
            <h5>{room.roomName}</h5>
            <p className="text-sm">RoomID: {room.roomID}</p>
          </div>
        </div>
        <FontAwesomeIcon
          className="mr-5 text-2xl hover:cursor-pointer"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onClick={() => {
            dispatch(
              setRoom({
                roomID: "",
                roomName: "",
                roomPic: "",
              }),
            );
            dispatch(setShowChatBar(false));
          }}
          icon={isHover ? solid("circle-xmark") : regular("circle-xmark")}
        />
      </div>
    </div>
  );
}

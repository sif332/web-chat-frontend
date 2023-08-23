import { IRoom } from "../../../models";

interface IProps {
  room: IRoom;
}

export default function ChatTopBar({ room }: IProps) {
  return (
    <div className="fixed w-full border-b border-gray-800 bg-[#2e2e2e] bg-opacity-30 backdrop-blur-lg backdrop-filter">
      <div className="flex shrink-0 items-center p-4">
        <img
          className="mr-2 h-[45px] w-[45px] rounded-full"
          src={room.roomPic}
          alt="DemonUser"
        />
        <div className="flex flex-col">
          <h5>{room.roomName}</h5>
          <p className="text-sm">Active</p>
        </div>
      </div>
    </div>
  );
}

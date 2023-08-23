import { useDispatch, useSelector } from "react-redux";
import { IRoom } from "../../../models";
import { setRoom } from "../../../redux/chatRoomSlice";
import { RootState } from "../../../redux";

interface IProp {
  roomList: IRoom[];
}

export default function DireactMessageRoomList({ roomList }: IProp) {
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const dispatch = useDispatch();
  return (
    <>
      {roomList.map((room, index) => {
        return (
          <div
            className={`flex items-center transition-all ease-in-out ${
              room.roomID === currentRoom.roomID &&
              "bg-red-500 text-white shadow-md"
            } p-4`}
            key={index}
            onClick={() => {
              dispatch(setRoom(room));
            }}
          >
            <img
              className="mr-2 h-[32px] w-[32px] rounded-full"
              src={room.roomPic}
              alt={room.roomName}
            />
            <p>{room.roomName}</p>
          </div>
        );
      })}
    </>
  );
}

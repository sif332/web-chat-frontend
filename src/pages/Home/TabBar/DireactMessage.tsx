import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../../../redux/chatRoomSlice";
import { RootState } from "../../../redux";
import { getRoomByRoomID } from "../../../services/roomDatabase";

interface IProp {
  roomList: string[];
}

export default function DireactMessage({ roomList }: IProp) {
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const dispatch = useDispatch();
  return (
    <>
      {roomList.map((roomID, index) => {
        const roomDetail = getRoomByRoomID(roomID)!;
        return (
          <div
            className={`flex items-center transition-all ease-in-out ${
              roomDetail.roomID === currentRoom.roomID &&
              "bg-red-500 text-white shadow-md"
            } p-4`}
            key={index}
            onClick={() => {
              dispatch(setRoom(roomDetail));
            }}
          >
            <img
              className="mr-2 h-[32px] w-[32px] rounded-full"
              src={roomDetail.roomPic}
              alt={roomDetail.roomName}
            />
            <p>{roomDetail.roomName}</p>
          </div>
        );
      })}
    </>
  );
}

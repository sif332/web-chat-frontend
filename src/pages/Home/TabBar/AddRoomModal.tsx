import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface IProps {
  onJoin: (
    roomID: string,
    successHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  onCreate: (
    roomName: string,
    successHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  onClose: () => void;
}

enum EButton {
  JoinRoom,
  CreateRoom,
}

export default function AddRoomModal({ onJoin, onCreate, onClose }: IProps) {
  const [isSelected, setSelected] = useState<EButton | null>(null);
  const [isHover, setHover] = useState(false);
  const inputField = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  function successHandle() {
    inputField.current!.value = "";
    setSelected(null);
    setHover(false);
    setError(false);
    onClose();
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <FontAwesomeIcon
        className="absolute -right-2 -top-2 text-2xl hover:cursor-pointer"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => {
          successHandle();
        }}
        icon={isHover ? solid("circle-xmark") : regular("circle-xmark")}
      />
      <div
        className={`flex flex-col items-center gap-4 transition-all delay-300 duration-500 ${
          isSelected === EButton.JoinRoom || isSelected === EButton.CreateRoom
            ? "opacity-100"
            : "-z-50 opacity-0"
        }`}
      >
        <h5 className="mt-3">
          {isSelected === EButton.JoinRoom
            ? "Please enter room ID"
            : "Please enter room name"}
        </h5>
        <input
          type="text"
          className="bg-[#333333] p-4 text-center focus:outline-0"
          ref={inputField}
        />
        <p className={`px-2 text-center text-red-500 ${!isError && "hidden"}`}>
          {isSelected === EButton.CreateRoom
            ? "Room existed"
            : "RoomID not existed"}
        </p>
      </div>

      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-red-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.JoinRoom
            ? "translate-y-[100%]"
            : "translate-y-[-100%]"
        } ${isSelected === EButton.CreateRoom && "hidden"}`}
        disabled={isLoading}
        onClick={() => {
          if (isSelected === EButton.JoinRoom) {
            if (inputField.current?.value) {
              onJoin(
                inputField.current.value,
                successHandle,
                setLoading,
                setError,
              );
              return;
            }
          }
          setSelected(EButton.JoinRoom);
        }}
      >
        {isLoading ? "Loading..." : "Join Room"}
      </button>
      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-green-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.CreateRoom
            ? "translate-y-[100%]"
            : "translate-y-[50%]"
        } ${isSelected === EButton.JoinRoom && "hidden"} `}
        disabled={isLoading}
        onClick={() => {
          if (isSelected === EButton.CreateRoom) {
            if (inputField.current?.value) {
              onCreate(
                inputField.current?.value,
                successHandle,
                setLoading,
                setError,
              );
              return;
            }
          }
          setSelected(EButton.CreateRoom);
        }}
      >
        {isLoading ? "Loading..." : "Create Room"}
      </button>
    </div>
  );
}

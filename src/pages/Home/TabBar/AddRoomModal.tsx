import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface IProps {
  onJoin: (roomID: string) => void;
  onCreate: (roomName: string) => void;
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

  function resetState() {
    inputField.current!.value = "";
    setSelected(null);
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <FontAwesomeIcon
        className="absolute -right-2 -top-2 text-2xl hover:cursor-pointer"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => {
          resetState();
          onClose();
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
      </div>

      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-red-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.JoinRoom
            ? "translate-y-[100%]"
            : "translate-y-[-100%]"
        } ${isSelected === EButton.CreateRoom && "hidden"}`}
        onClick={() => {
          if (isSelected === EButton.JoinRoom) {
            if (inputField.current?.value) {
              onJoin(inputField.current.value);
              resetState();
              onClose();
              return;
            }
          }
          setSelected(EButton.JoinRoom);
        }}
      >
        Join Room
      </button>
      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-green-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.CreateRoom
            ? "translate-y-[100%]"
            : "translate-y-[50%]"
        } ${isSelected === EButton.JoinRoom && "hidden"} `}
        onClick={() => {
          if (isSelected === EButton.CreateRoom) {
            if (inputField.current?.value) {
              onCreate(inputField.current?.value);
              resetState();
              onClose();
              return;
            }
          }
          setSelected(EButton.CreateRoom);
        }}
      >
        Create Room
      </button>
    </div>
  );
}

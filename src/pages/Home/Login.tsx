import React, { useRef } from "react";

interface IProps {
  onLogin: (userID: string, username: string) => void;
  onClose: () => void;
}

export default function Login({ onLogin, onClose }: IProps) {
  const inputUserID = useRef<HTMLInputElement>(null);
  const inputUserName = useRef<HTMLInputElement>(null);

  function resetState() {
    inputUserID.current!.value = "";
    inputUserName.current!.value = "";
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div
        className={
          "flex flex-col items-center gap-4 transition-all delay-300 duration-500"
        }
      >
        <h5 className="mt-3">Login</h5>
        <input
          type="text"
          className="bg-[#333333] p-4 text-center focus:outline-0"
          ref={inputUserID}
          placeholder="UserID"
        />
        <input
          type="text"
          className="bg-[#333333] p-4 text-center focus:outline-0"
          ref={inputUserName}
          placeholder="Username"
        />
      </div>

      <button
        className="absolute top-1/2 h-[50px] w-[120px] translate-y-[150%] bg-red-500 p-2 text-white transition-transform duration-300 ease-out "
        onClick={() => {
          if (inputUserID.current?.value && inputUserName.current?.value) {
            onLogin(inputUserID.current.value, inputUserName.current.value);
            resetState();
            onClose();
            return;
          }
        }}
      >
        Login
      </button>
    </div>
  );
}

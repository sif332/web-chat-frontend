import React, { useState, useRef } from "react";

interface IProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string, displayName: string) => void;
}

enum EButton {
  Register,
  Login,
}

export default function Login({ onLogin, onRegister }: IProps) {
  const [isSelected, setSelected] = useState<EButton | null>(null);
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputDisplayName = useRef<HTMLInputElement>(null);

  function resetState() {
    inputUsername.current!.value = "";
    inputPassword.current!.value = "";
    setSelected(null);
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div
        className={`flex flex-col items-center gap-4 transition-all delay-300 duration-500 ${
          isSelected === EButton.Register || isSelected === EButton.Login
            ? "opacity-100"
            : "-z-50 opacity-0"
        }`}
      >
        <h5 className="mt-3">
          {isSelected === EButton.Register ? "Register" : "Login"}
        </h5>
        <input
          type="text"
          className="bg-[#333333] p-4 text-center focus:outline-0"
          placeholder="Username"
          ref={inputUsername}
        />
        <input
          type="text"
          className="bg-[#333333] p-4 text-center focus:outline-0"
          placeholder="Password"
          ref={inputPassword}
        />
        <input
          type="text"
          className={`bg-[#333333] p-4 text-center focus:outline-0 ${
            isSelected === EButton.Login && "hidden"
          }`}
          placeholder="Display Name"
          ref={inputDisplayName}
        />
      </div>

      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-red-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.Register
            ? "translate-y-[200%]"
            : "translate-y-[-100%]"
        } ${isSelected === EButton.Login && "hidden"}`}
        onClick={() => {
          if (isSelected === EButton.Register) {
            if (
              inputUsername.current?.value &&
              inputPassword.current?.value &&
              inputDisplayName.current?.value
            ) {
              onRegister(
                inputUsername.current.value,
                inputPassword.current.value,
                inputDisplayName.current.value,
              );
              resetState();
              return;
            }
          }
          setSelected(EButton.Register);
        }}
      >
        Register
      </button>
      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-green-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.Login
            ? "translate-y-[130%]"
            : "translate-y-[50%]"
        } ${isSelected === EButton.Register && "hidden"} `}
        onClick={() => {
          if (isSelected === EButton.Login) {
            if (inputUsername.current?.value && inputPassword.current?.value) {
              onLogin(inputUsername.current.value, inputPassword.current.value);
              resetState();
              return;
            }
          }
          setSelected(EButton.Login);
        }}
      >
        Login
      </button>
    </div>
  );
}

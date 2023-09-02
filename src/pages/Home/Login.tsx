import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface IProps {
  onLogin: (
    username: string,
    password: string,
    successLoginHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  onRegister: (
    username: string,
    password: string,
    displayName: string,
    successRegisterHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
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
  const [isHover, setHover] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  function successLoginHandle() {
    inputUsername.current!.value = "";
    inputPassword.current!.value = "";
    setSelected(null);
  }

  function successRegisterHandle() {
    inputUsername.current!.value = "";
    inputPassword.current!.value = "";
    setSelected(EButton.Login);
  }

  function closeHandle() {
    inputUsername.current!.value = "";
    inputPassword.current!.value = "";
    setSelected(null);
    setHover(false);
    setError(false);
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      {(isSelected === EButton.Register || isSelected === EButton.Login) && (
        <FontAwesomeIcon
          className="absolute -right-2 -top-2 text-2xl hover:cursor-pointer"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onClick={closeHandle}
          icon={isHover ? solid("circle-xmark") : regular("circle-xmark")}
        />
      )}
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
          type="password"
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
        <p className={`px-2 text-center text-red-500 ${!isError && "hidden"}`}>
          {isSelected === EButton.Login
            ? "Incorrect username or password"
            : "Incorrect input"}
        </p>
      </div>

      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-red-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.Register
            ? "translate-y-[220%]"
            : "translate-y-[-100%]"
        } ${isSelected === EButton.Login && "hidden"}`}
        disabled={isLoading}
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
                successRegisterHandle,
                setLoading,
                setError,
              );
              return;
            }
          }
          setSelected(EButton.Register);
        }}
      >
        {isLoading ? "Loading..." : "Register"}
      </button>
      <button
        className={`absolute top-1/2 h-[50px] w-[120px] bg-green-500 p-2 text-white transition-transform duration-300 ease-out ${
          isSelected === EButton.Login
            ? "translate-y-[130%]"
            : "translate-y-[50%]"
        } ${isSelected === EButton.Register && "hidden"} `}
        disabled={isLoading}
        onClick={() => {
          if (isSelected === EButton.Login) {
            if (inputUsername.current?.value && inputPassword.current?.value) {
              onLogin(
                inputUsername.current.value,
                inputPassword.current.value,
                successLoginHandle,
                setLoading,
                setError,
              );
              return;
            }
          }
          setSelected(EButton.Login);
        }}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

import React from "react";

interface IProps {
  isShow: boolean;
  tailwindWidth: string;
  tailwindHeight: string;
  children: React.ReactNode;
}

export default function Modal({ isShow, tailwindWidth, tailwindHeight, children }: IProps) {
  return (
    <div
      className={`${
        isShow ? "z-50 opacity-100" : "-z-50 opacity-0"
      } fixed left-0 top-0  flex h-screen w-screen items-center justify-center bg-gray-600 bg-opacity-30 backdrop-blur-lg backdrop-filter transition-opacity`}
    >
      <div
        className={`relative ${tailwindWidth}  ${tailwindHeight}  bg-[#262626]`}
      >
        {children}
      </div>
    </div>
  );
}

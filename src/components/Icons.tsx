import React, { useState } from "react";

interface IProps {
  icon: string;
  name: string;
  hoverIcon?: string;
  onClick?: () => void;
}

export default function Icons({
  icon,
  name,
  hoverIcon = icon,
  onClick,
}: IProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="p-2 hover:cursor-pointer"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={onClick}
    >
      <img
        className="h-[28px] w-[28px]"
        src={isHover ? hoverIcon : icon}
        alt={name}
      />
    </div>
  );
}

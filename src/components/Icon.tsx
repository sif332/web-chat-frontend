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
  const [isHover, setHover] = useState(false);
  return (
    <div
      className="p-2 hover:cursor-pointer"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
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

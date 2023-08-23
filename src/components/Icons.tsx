import React, { useState } from "react";

interface IProps {
  icon: string;
  name: string;
  hoverIcon?: string;
}

export default function Icons({ icon, name, hoverIcon = icon }: IProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="p-2 hover:cursor-pointer"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover ? (
        <img className="h-[28px] w-[28px]" src={hoverIcon} alt={name} />
      ) : (
        <img className="h-[28px] w-[28px]" src={icon} alt={name} />
      )}
    </div>
  );
}

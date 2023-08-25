import { IMessage } from "../../../models";

interface IProp {
  username: string;
  message: IMessage;
}

export default function Message({ username, message }: IProp) {
  const time = new Date(message.time);
  const date = time.toDateString();
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return username === message.username ? (
    <div className="flex w-full flex-row-reverse p-4">
      <img
        className="ml-2 h-[32px] w-[32px] rounded-full"
        src={message.profilePic}
        alt="DemonUser"
      />
      <div className="flex flex-col items-end">
        <p className="mb-2 w-[70%] break-words bg-[#383838] p-4 shadow-md">
          {message.message}
        </p>
        <p className="font-w text-sm">{`${hours}:${minutes} ${date}`}</p>
      </div>
    </div>
  ) : (
    <div className="flex w-full p-4">
      <img
        className="mr-2 h-[32px] w-[32px] rounded-full"
        src={message.profilePic}
        alt="DemonUser"
      />
      <div className="flex flex-col">
        <p className="mb-2 w-[70%] break-words bg-[#383838] p-4 shadow-md">
          {message.message}
        </p>
        <p className="font-w text-sm">{`${hours}:${minutes} ${date}`}</p>
      </div>
    </div>
  );
}

import demoProfile from "../../../assets/icons/user.png";

interface IProps {
  username: string;
}

export default function ChatTopBar({ username }: IProps) {
  return (
    <div className="fixed w-full border-b border-gray-800 bg-[#2e2e2e] bg-opacity-30 backdrop-blur-lg backdrop-filter">
      <div className="flex shrink-0 items-center p-4">
        <img
          className="mr-2 h-[45px] w-[45px] "
          src={demoProfile}
          alt="DemonUser"
        />
        <div className="flex flex-col">
          <h5>{username}</h5>
          <p className="text-sm">Active</p>
        </div>
      </div>
    </div>
  );
}

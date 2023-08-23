import demoProfile from "../assets/icons/user.png";

export interface IMessage {
  username: string;
  profilePic: string;
  time: string;
  message: string;
}

export interface IDireactMessageList {
  messages: IMessage[];
}

export function getDemoMessage() {
  const message =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus. Tincidunt eget nullam non nisi est sit. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Iaculis urna id volutpat lacus.";
  const currentTime = new Date();
  const direactMessageList: IDireactMessageList = {
    messages: [
      {
        username: "Xaipher SK",
        profilePic: demoProfile,
        time: currentTime.toISOString(),
        message: message,
      },
    ],
  };
  for (let i = 0; i < 9; i++) {
    direactMessageList.messages.push({
      username: i % 2 === 0 ? "Seletinar SK" : "Xaipher SK",
      profilePic: demoProfile,
      time: new Date(
        currentTime.getTime() + 480 * (i + 1) * 60 * 1000,
      ).toISOString(),
      message: message,
    });
  }
  direactMessageList.messages.sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });
  return direactMessageList;
}

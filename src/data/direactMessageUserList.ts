import demoProfile from "../assets/icons/user.png";

export interface IDireactMessageUserList {
  users: {
    username: string;
    profilePic: string;
  }[];
}

export const direactMessageUserList: IDireactMessageUserList = {
  users: [
    {
      username: "Xaipher SK",
      profilePic: demoProfile,
    },
    {
      username: "Seletinar SK",
      profilePic: demoProfile,
    },
    {
      username: "Settawut SK",
      profilePic: demoProfile,
    },
  ],
};

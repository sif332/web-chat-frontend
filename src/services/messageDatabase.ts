import demoProfile from "../assets/icons/user.png";
import { IMessage } from "../models";
import { LoremIpsum } from "lorem-ipsum";
import { getUserPicByID } from "./userDatabase";

function messageGenerator(userID: string, username: string) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  const message = lorem.generateSentences(2);
  const currentTime = new Date();
  const direactMessageList: IMessage[] = [
    {
      userID: userID,
      username: username,
      profilePic: getUserPicByID(userID) ? getUserPicByID(userID) : demoProfile,
      time: currentTime.toISOString(),
      message: message,
    },
  ];

  for (let i = 0; i < 9; i++) {
    let newUserID = userID;
    let newUsername = username;
    if (i % 2 === 0) {
      newUserID = "user002";
      newUsername = "Seletinar SK";
    }
    direactMessageList.push({
      userID: newUserID,
      username: newUsername,
      profilePic: getUserPicByID(newUserID)
        ? getUserPicByID(newUserID)
        : demoProfile,
      time: new Date(
        currentTime.getTime() + 480 * (i + 1) * 60 * 1000,
      ).toISOString(),
      message: message,
    });
  }
  direactMessageList.sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  return direactMessageList;
}

export function getMessageByRoomID(
  roomID: string,
  userID: string,
  username: string,
) {
  const messages = messageGenerator(userID, username);
  const roomMessage = {
    roomID: roomID,
    messages: messages,
  };
  return roomMessage;
}

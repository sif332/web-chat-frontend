import demoProfile from "../assets/icons/user.png";
import { IMessage } from "../models";
import { LoremIpsum } from "lorem-ipsum";

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
      profilePic: demoProfile,
      time: currentTime.toISOString(),
      message: message,
    },
  ];

  for (let i = 0; i < 9; i++) {
    direactMessageList.push({
      userID: i % 2 === 0 ? "user002" : userID,
      username: i % 2 === 0 ? "Seletinar SK" : username,
      profilePic: demoProfile,
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

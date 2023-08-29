import { useEffect, useState } from "react";
import ChatTopBar from "./ChatTopBar";
import Message from "./Message";
import TextFieldBar from "./TextFieldBar";
import { getMessagesByRoomID } from "../../../services/message.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IGetMessageByRoomID, IMessage, IRoom } from "../../../types";
import defaultProfile from "../../../assets/icons/user.png";
import { webChatSocket } from "../../../libs/socket.io";
import { setUser } from "../../../redux/userSlice";

interface IProps {
  currentRoom: IRoom;
}

export default function ChatBar({ currentRoom }: IProps) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const isShowChatBar = useSelector(
    (state: RootState) => state.room.isShowChatBar,
  );

  async function sendMessageHandle(message: string) {
    const token = localStorage.getItem("token");
    webChatSocket.emit(
      "chat",
      token,
      currentRoom.roomID,
      user.username,
      message,
    );
  }

  useEffect(() => {
    if (isShowChatBar) {
      webChatSocket.emit("joinRoom", currentRoom.roomID);
      webChatSocket.on(
        "chat",
        (roomID: string, message: IGetMessageByRoomID) => {
          if (roomID !== currentRoom.roomID) {
            return;
          }
          const newMessage: IMessage = {
            userID: message.user_id,
            username: message.username,
            profilePic: defaultProfile,
            time: message.created_at,
            message: message.message,
          };
          setMessageList((prevMessage) => [newMessage, ...prevMessage]);
        },
      );
      webChatSocket.on("invalidToken", () => {
        dispatch(
          setUser({
            displayName: "",
            userID: "",
            username: "",
          }),
        );
      });
      getMessagesByRoomID(currentRoom.roomID)
        .then((response) => {
          const messages: IMessage[] = response.data.map((message) => {
            return {
              userID: message.user_id,
              username: message.username,
              profilePic: defaultProfile,
              time: message.created_at,
              message: message.message,
            };
          });
          setMessageList(messages);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          if (error.response) {
            console.error("Server Error:", error.response);
          } else if (error.request) {
            console.error("Network Error:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    }
    return () => {
      webChatSocket.off("chat");
    };
  }, [currentRoom.roomID, isShowChatBar, dispatch]);

  return (
    <div className="relative flex grow flex-col bg-[#2e2e2e]">
      {isShowChatBar ? (
        <>
          <ChatTopBar room={currentRoom} />
          <div className="flex w-full grow flex-col-reverse overflow-y-auto bg-[#252525] pt-24 shadow-inner">
            {messageList.map((message, index) => {
              return (
                <Message key={index} userID={user.userID} message={message} />
              );
            })}
          </div>
          <TextFieldBar onSend={sendMessageHandle} />
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <h1 className="mb-2">Welcome</h1>
          <p>Please select a chat room</p>
          <p className="pt-4 text-gray-500">
            I hash your password, so I cannot see your plaintext password.
          </p>
          <p className="text-gray-500">This is not end-to-end encryption.</p>
          <p className="text-gray-500">
            So, I can see your messages in the database.
          </p>
          <p className="text-gray-500">
            I will apply the encryption once I have time.
          </p>
        </div>
      )}
    </div>
  );
}

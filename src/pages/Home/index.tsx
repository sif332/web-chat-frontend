import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import ChatBar from "./ChatBar";
import Modal from "../../components/Modal";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setUser } from "../../redux/userSlice";
import { AxiosError } from "axios";
import {
  sendLoginCredentials,
  sendRegistrationCredentials,
  fetchUser,
} from "../../services/user.api";
import { webChatSocket } from "../../libs/socket.io";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const dispatch = useDispatch();
  const [isShow, setShow] = useState(false);

  //show Login Modal if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined && token !== "undefined") {
      webChatSocket.connect();
      fetchUser(token)
        .then((res) => {
          dispatch(
            setUser({
              userID: res.data.userID,
              username: res.data.username,
              displayName: res.data.displayName,
            }),
          );
          setShow(false);
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
    } else {
      localStorage.removeItem("token");
      setShow(true);
    }
  }, [user, dispatch]);

  async function loginHandle(
    username: string,
    password: string,
    successLoginHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      setLoading(true);
      const response = await sendLoginCredentials(username, password);
      setLoading(false);
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(
        setUser({
          userID: response.data.userID,
          username: response.data.username,
          displayName: response.data.displayName,
        }),
      );
      successLoginHandle();
    } catch (err) {
      setLoading(false);
      setError(true);
      const error = err as AxiosError;
      if (error.response) {
        console.error("Server Error:", error.response);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  async function registerHandle(
    username: string,
    password: string,
    displayName: string,
    successRegisterHandle: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      setLoading(true);
      await sendRegistrationCredentials(username, password, displayName);
      setLoading(false);
      //trigger Login Modal to switch from register mode to login mode
      successRegisterHandle();
    } catch (err) {
      setLoading(false);
      setError(true);
      const error = err as AxiosError;
      if (error.response) {
        console.error("Server Error:", error.response);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  return (
    <div className="flex h-screen w-full text-[#b5b5b4]">
      <Modal
        isShow={isShow}
        tailwindWidth={"w-[300px]"}
        tailwindHeight={"h-[400px]"}
      >
        <Login onLogin={loginHandle} onRegister={registerHandle} />
      </Modal>
      <Navbar />
      <TabBar />
      <ChatBar key={currentRoom.roomID} currentRoom={currentRoom} />
    </div>
  );
}

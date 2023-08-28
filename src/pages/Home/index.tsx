import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import ChatBar from "./ChatBar";
import Modal from "../../components/Modal";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setUser } from "../../redux/userSlice";
import axios, { AxiosError } from "axios";
import { ILogin } from "../../types";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const dispatch = useDispatch();
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios({
        method: "get",
        url: "http://localhost:4000/user",
        headers: { Authorization: `Bearer ${token}` },
      })
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
          if (error.response) {
            console.error("Server Error:", error.response.status);
          } else if (error.request) {
            console.error("Network Error:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    }
  }, [user, dispatch]);

  async function loginHandle(username: string, password: string) {
    const axiosBody = {
      username: username,
      password: password,
    };
    try {
      const response = await axios<ILogin>({
        method: "post",
        url: "http://localhost:4000/user/login",
        data: axiosBody,
      });
      const token = response.data.token;
      if (!token) {
        return;
      }
      localStorage.setItem("token", token);
      console.log("token:", token);
      dispatch(
        setUser({
          userID: response.data.userID,
          username: response.data.username,
          displayName: response.data.displayName,
        }),
      );
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    }
  }

  async function registerHandle(
    username: string,
    password: string,
    displayName: string,
  ) {
    const axiosBody = {
      username: username,
      password: password,
      displayName: displayName,
    };
    try {
      const response = await axios<string>({
        method: "post",
        url: "http://localhost:4000/user/register",
        data: axiosBody,
      });
      const userID = response.data;
      if (!userID) {
        return;
      }
      dispatch(
        setUser({
          userID: "",
          username: "",
          displayName: "",
        }),
      );
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
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

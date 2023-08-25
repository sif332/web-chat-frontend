import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import ChatBar from "./ChatBar";
import Modal from "../../components/Modal";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setUser } from "../../redux/userSlice";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const dispatch = useDispatch();
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (user.userID !== "") {
      setShow(false);
    }
  }, [user]);

  function onLogin(userId: string, username: string) {
    console.log(userId, username);
    dispatch(
      setUser({
        userID: userId,
        username: username,
      }),
    );
  }

  return (
    <div className="flex h-screen w-full text-[#b5b5b4]">
      <Modal isShow={isShow} width={300} height={300}>
        <Login
          onLogin={onLogin}
          onClose={() => {
            setShow(false);
          }}
        />
      </Modal>
      <Navbar />
      <TabBar />
      <ChatBar key={currentRoom.roomID} currentRoom={currentRoom} />
    </div>
  );
}

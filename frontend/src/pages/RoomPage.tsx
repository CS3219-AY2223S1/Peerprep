import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/room/Footer";
import NavBar from "../components/common/NavBar";
import { useSocketContext } from "../contexts/SocketContext";
import { useAuthContext } from "../contexts/AuthContext";
import Editor from "../components/editor/Editor";
import Chat from "../components/room/Chat";
import { URL_GET_ROOM_UUID, URL_LEAVE_ROOM } from "../configs";

export default () => {
  const { partner, dispatch } = useSocketContext();
  const { user, cookie } = useAuthContext();
  const [text, setText] = useState<string>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const accessToken = cookie.userCred;
    const res = await axios
      .get(URL_GET_ROOM_UUID, { headers: { authorization: accessToken } })
      .catch((err) => {
        console.log(err);
      });
    if (res && res.data) {
      dispatch({
        type: "MATCHED",
        payload: {
          partner: res.data.partnerName,
          roomUuid: res.data.uuid,
          difficulty: res.data.difficulty,
        },
      });
    }
  };

  const onLeave = () => {
    // TODO
    // const accessToken = cookie.userCred;
    // const res = axios
    //   .post(URL_LEAVE_ROOM, { headers: { authorization: accessToken } })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(res);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="h-full flex">
        <div className="relative overflow-auto h-full w-full">
          <Editor {...{ text, setText }} />
        </div>
        <div className="absolute z-1 bottom-16 right-2 w-1/5">
          <Chat />
        </div>
      </div>
      <Footer partnername={partner} username={user} onLeave={onLeave} />
    </div>
  );
};

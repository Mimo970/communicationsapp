import Input from "./Input";
import React, { useContext, useState } from "react";
import ChatMessages from "./ChatMessages";
import { ChatContext } from "contexts/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  // data.INITIAL_STATE && console.log(data.INITIAL_STATE.chatId);

  return (
    <div className="xxs:col-span-8 xs:col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-5 primary-lighter ">
      {data.chatId === "null" ? (
        <div className=" flex flex-row justify-between h-screen "></div>
      ) : (
        <div className=" flex flex-col justify-between">
          <ChatMessages />
          <Input />
        </div>
      )}
    </div>
  );
};

export default Chat;

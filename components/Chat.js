import Input from "./Input";
import React, { useContext, useState } from "react";
import ChatMessages from "./ChatMessages";
import { ChatContext } from "contexts/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="xxs:col-span-8 xs:col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-5 primary-lighter ">
      {data.chatId === "null" ? (
        <div className=" "> </div>
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

import Input from "./Input";
import React, { useState } from "react";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  return (
    <div className="xxs:col-span-8 xs:col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-5 bg-zinc-700    ">
      <div className="h-[49.8rem] flex flex-col justify-between">
        <ChatMessages />
        <Input />
      </div>
    </div>
  );
};

export default Chat;

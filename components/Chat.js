import Input from "./Input";
import React, { useState } from "react";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  return (
    <div className="col-span-5 bg-zinc-700 ">
      <div className="h-[49.8rem] flex flex-col justify-between">
        <ChatMessages />
        <Input />
      </div>
    </div>
  );
};

export default Chat;

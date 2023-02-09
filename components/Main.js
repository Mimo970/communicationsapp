import React from "react";
import Bio from "./Bio";
import Chat from "./Chat";
import Conversation from "./Conversation";
import DirectMessages from "./DirectMessages";
import DMSLayout from "./DMSLayout";

const Main = () => {
  return (
    <>
      <div className=" grid grid-cols-12">
        <DirectMessages />
        <Conversation />
      </div>
    </>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import Bio from "./Bio";
import Chat from "./Chat";
import Conversation from "./Conversation";
import DirectMessages from "./DirectMessages";
import DMSLayout from "./DMSLayout";
import useScreenSize from "../utils/screenSize";

const Main = () => {
  const screenSize = useScreenSize();

  return (
    <>
      {/* Screen Width: {screenSize.width} */}
      <div className="h-screen grid grid-cols-12">
        {screenSize.width === 0 || screenSize.width > 475 ? (
          <DirectMessages />
        ) : null}
        <Conversation />
      </div>
    </>
  );
};

export default Main;

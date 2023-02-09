import React from "react";
import Bio from "./Bio";
import Chat from "./Chat";
import ConversationNavbar from "./ConversationNavbar";

const Conversation = () => {
  return (
    <div className="  col-span-10">
      <ConversationNavbar />
      <div className="grid grid-cols-8">
        <Chat />
        <Bio />
      </div>
    </div>
  );
};

export default Conversation;

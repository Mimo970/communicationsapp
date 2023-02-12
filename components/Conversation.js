import React from "react";
import Bio from "./Bio";
import Chat from "./Chat";
import ConversationNavbar from "./ConversationNavbar";
import DirectMessages from "./DirectMessages";
import DropdownMenu from "./DropdownMenu";

const Conversation = () => {
  return (
    <div className="xxs:col-span-12 xs:col-span-9 sm:col-span-9 md:col-span-9 lg:col-span-10">
      <div className="flex flex-col">
        <ConversationNavbar>
          <DropdownMenu />
        </ConversationNavbar>
      </div>

      <div className="grid grid-cols-8 ">
        <Chat />
        <Bio />
      </div>
    </div>
  );
};

export default Conversation;

import React from "react";
import DM from "./Dm";
import DMSNavbar from "./DMSNavbar";
import UserFooter from "./UserFooter";

const DirectMessages = () => {
  return (
    <div className="col-span-2  bg-neutral-800 h-screen flex flex-col items-start px-2 py-2">
      <DMSNavbar />
      <div className="py-2">Direct Messages</div>
      <DM />
      <DM />
      <UserFooter />
    </div>
  );
};

export default DirectMessages;

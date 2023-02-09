import React from "react";
import DM from "./Dm";
import DMSNavbar from "./DMSNavbar";
import UserFooter from "./UserFooter";
import DMSLayout from "./DMSLayout";
const DirectMessages = () => {
  return (
    <>
      <div className="col-span-2 bg-neutral-800    flex flex-col items-center pt-2">
        <DMSLayout>
          <div className="flex flex-col">
            <span className="py-2">Direct Messages</span>
            <DM />
            <DM />
          </div>
        </DMSLayout>
      </div>
    </>
  );
};

export default DirectMessages;

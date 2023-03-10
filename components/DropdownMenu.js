import React from "react";
import DM from "./Dm";
import DMSLayout from "./DMSLayout";

const DropdownMenu = () => {
  return (
    <div className="py-2 xxs:col-span-3 xs:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 bg-neutral-800 flex flex-col items-center ">
      <DMSLayout>
        <div className="flex flex-col overflow-y-scroll max-h-[45rem] ">
          <span className="py-2">Direct Messages</span>
          <DM />
          <DM />
        </div>
      </DMSLayout>
    </div>
  );
};

export default DropdownMenu;

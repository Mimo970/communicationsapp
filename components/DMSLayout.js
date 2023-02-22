import React from "react";
import DMSNavbar from "./DMSNavbar";
import UserFooter from "./UserFooter";

const DMSLayout = ({ children }) => {
  return (
    // <div className="flex min-h-full w-full flex-col justify-between ">
    //   <DMSNavbar />
    //   {children}
    //   <UserFooter />
    // </div>
    // h-[53rem]
    <div className="h-[53rem] flex flex-col  w-full">
      <div className="  ">
        <DMSNavbar />
      </div>
      <div className="flex-1 mx-4 ">
        <div className="flex flex-col">{children}</div>
      </div>
      <div className=" ">
        <UserFooter />
      </div>
    </div>
  );
};

export default DMSLayout;

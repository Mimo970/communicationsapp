import React from "react";

const DMSNavbar = () => {
  return (
    <div className="flex justify-center border-b border-b-neutral-900 pb-2">
      <div className="relative ">
        <input
          type="search"
          className="cursor-pointer w-64 text-white placeholder-neutral-200  bg-neutral-900 rounded  p-1.5  focus:outline-none focus:shadow-outline"
          placeholder="Find or start a conversation "
        />
      </div>
    </div>
  );
};

export default DMSNavbar;

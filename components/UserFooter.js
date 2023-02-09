import React from "react";
import { MdSettings } from "react-icons/md";
const UserFooter = () => {
  return (
    <div className="bg-neutral-900 px-2 py-2 w-full flex items-center justify-between">
      <div className="flex items-center">
        <img
          className="rounded-full w-11 h-11 object-center"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <p className="px-1 text-lg font-bold">Mimo</p>
      </div>

      <button className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded">
        Sign Out
      </button>

      <span class="cursor-pointer">
        <MdSettings />
      </span>
    </div>
  );
};

export default UserFooter;

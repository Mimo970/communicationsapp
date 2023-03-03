import React from "react";
import { FiX } from "react-icons/fi";
const Dm = (props) => {
  return (
    <div className="cursor-pointer flex items-center hover:bg-neutral-800 px-1 py-1 w-full rounded">
      <img
        className="rounded-full w-11 h-11 object-center"
        src={props.photoURL}
        alt=""
      />
      <span className="px-2 text-md font-semibold">{props.displayName}</span>
      {/* <span className="ml-auto px-3 py-1 rounded-full">
        <FiX />
      </span> */}
    </div>
  );
};

export default Dm;

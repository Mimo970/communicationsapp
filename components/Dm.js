import React from "react";
const Dm = (props) => {
  return (
    <div className=" flex items-center hover:bg-neutral-700 px-1 py-1 w-full rounded">
      <img
        className="rounded-full w-11 h-11 object-center"
        src={props.img}
        alt=""
      />
      <span className="px-2 text-md font-semibold">{props.displayName}</span>
    </div>
  );
};

export default Dm;

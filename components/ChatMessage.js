import React from "react";
const ChatMessage = () => {
  return (
    <div className="flex items-start">
      <img
        src="https://i.pinimg.com/736x/0c/e4/d7/0ce4d75808fa634815d237ec92c5d538.jpg"
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex flex-col w-1/2 rounded p-2 ">
        <div className="flex items-center p-2">
          <p className="text-lg font-medium text-neutral-100">Luffy</p>
          <p className="mx-1 text-zinc-400">10/20/2023</p>
          <p className=" text-zinc-400">11:32 PM</p>
        </div>
        <main className="flex flex-col bg-neutral-800 w-1/2 rounded p-2">
          <p className="text-lg font-medium text-neutral-100">Luffy</p>
          <p className="text-md text-white  w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            sed eum quod cupiditate deserunt. Velit amet minima error soluta
            placeat modi similique possimus assumenda, qui ratione alias
            architecto laboriosam id.
          </p>
        </main>
      </div>
    </div>
  );
};

export default ChatMessage;

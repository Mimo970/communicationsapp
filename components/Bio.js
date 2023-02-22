import { ChatContext } from "contexts/ChatContext";
import React, { useContext } from "react";

const Bio = () => {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className="md:col-span-0  lg:col-span-3 flex flex-col h-screen primary-darker  ">
      {data.chatId === "null" ? (
        <div className="p-5">
          <h1 className="font-bold text-2xl">Active Now</h1>
          <div className="flex flex-col items-center m-2">
            <h1 className="text-lg font-semibold	">It's quiet for now...</h1>
            <div>when you are texting a friend we'll show their bio here!</div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" bg-purple-900 py-10 "> </div>
          <div className=" ">
            <img
              className="rounded-full w-24 h-24 object-center mx-4 bioimg"
              src={data.user.photoURL}
              alt=""
            />
          </div>
          <div className="flex flex-col items-start m-5 p-4 mt-14 bg-zinc-900 rounded-lg">
            <div className="border-b border-b-neutral-500 pb-3 w-full">
              {data.user.displayName}
            </div>

            <div className=" rounded-lg shadow-md">
              <h2 className="text-lg  font-medium mb-4">About Me</h2>
              <p className="text-zinc-400 mb-4">{data.user.aboutMe}</p>

              <div className="border-b border-b-neutral-500  ">
                <div>Member Since</div>
                <div className="text-zinc-400 pb-1.5">Sep 14, 2022</div>
              </div>
              <div>
                <div>
                  <h1 className="py-1">Note</h1>
                  <div>
                    <textarea
                      className="outline-none border-transparent bg-transparent p-0 resize-none w-full"
                      placeholder="Click to add a note"
                      name=""
                      id=""
                      cols="60"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;

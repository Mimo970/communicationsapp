import React from "react";

const Bio = () => {
  return (
    <div className="flex flex-col col-span-3 h-screen bg-zinc-800 ">
      <div className=" bg-purple-900 py-10">color</div>
      <div>
        <img
          className="rounded-full w-14 h-14 object-center mx-4"
          src="https://i.pinimg.com/736x/0c/e4/d7/0ce4d75808fa634815d237ec92c5d538.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-col items-start m-5 p-4 bg-zinc-900 rounded-lg">
        <div className="border-b border-b-neutral-500 pb-3 w-full">Luffy</div>

        <div className=" rounded-lg shadow-md">
          <h2 className="text-lg  font-medium mb-4">About Me</h2>
          <p className="text-zinc-400 mb-4">
            Hi, I'm a developer who is passionate about building amazing things
            on the web. I love learning new technologies and solving complex
            problems. When I'm not coding, I enjoy hiking, reading, and playing
            video games.
          </p>
          <h3 className="text-lg  text-zinc-400 font-medium mb-2">Skills</h3>
          <ul className="list-disc list-inside">
            <li className="text-zinc-400 mb-2">React</li>
            <li className="text-zinc-400 mb-2">Node.js</li>
            <li className="text-zinc-400 mb-2">Express</li>
            <li className="text-zinc-400 mb-2">TailwindCSS</li>
          </ul>
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
  );
};

export default Bio;

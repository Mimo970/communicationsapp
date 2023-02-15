import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useState } from "react";
import { BsPaperclip } from "react-icons/bs";
import { MdAddPhotoAlternate } from "react-icons/md";
const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(AuthContext);
  return (
    <div className="flex items-center bg-zinc-900 m-3 p-2 rounded-md">
      <input
        type="text"
        className="w-full bg-neutral-900 rounded text-white p-1.5 focus:outline-none focus:shadow-outline"
        placeholder="Message @user"
      />
      <div className="flex items-center">
        <BsPaperclip className="icons cursor-pointer" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <MdAddPhotoAlternate className="icons mx-1 cursor-pointer" />
        </label>
        <button className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded">
          Send
        </button>
      </div>
      {/* <div className="flex items-center">
        <BsPaperclip className="icons" />

         
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
         />
        <label htmlFor="file">
          <MdAddPhotoAlternate className="icons mx-1" />
        </label>
        <button className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded">
          Send
        </button>
      </div> */}
    </div>
  );
};

export default Input;

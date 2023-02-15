import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { MdSettings } from "react-icons/md";
import { AuthContext } from "contexts/AuthContext";
const UserFooter = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-neutral-900 px-2 py-3 pb-5 w-full flex items-center justify-between z-50">
      <div className="flex items-center">
        <img
          className="rounded-full w-11 h-11 object-center"
          src={currentUser.photoURL}
          alt=""
        />
        <p className="px-1 text-lg font-bold">{currentUser.displayName}</p>
      </div>

      <button
        onClick={() => signOut(auth)}
        className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded"
      >
        Sign Out
      </button>

      <span className="cursor-pointer">
        <MdSettings />
      </span>
    </div>
  );
};

export default UserFooter;

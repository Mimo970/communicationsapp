import { AuthContext } from "contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
// import Avatar from "./Avatar"; // A separate Avatar component to display the user's profile image
import { ChromePicker } from "react-color";
import { MdOutlineCancel } from "react-icons/md";

const MyAccount = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const handleSettings = (e) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <div className="pt-5 bg-zinc-700 h-screen ">
      <div className=" flex flex-col max-w-4xl mx-auto bg-zinc-800 p-4 rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <span className="cursor-pointer" onClick={handleSettings}>
            <MdOutlineCancel />
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4  ">
          <div className="w-full md:w-1/4">
            <h1 className="text-lg font-bold">Preview</h1>
            <div className="border rounded p-4">
              <img
                className="rounded-full w-11 h-11 object-center"
                src={currentUser.photoURL}
                alt=""
              />
              {/* <Avatar imageSrc="user-profile-image.jpg" /> */}
              <div className="mt-4">
                <h2 className="text-lg font-bold">Username</h2>
                <p className="text-gray-500">@{currentUser.displayName}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Email</h2>
                <p className="text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-lg font-bold mb-2">Account Settings</h2>
            <div className="border rounded p-4 flex flex-col gap-10">
              <div>
                <h1></h1>
                <div className="flex ">
                  <button className="mx-1 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded">
                    Change Avatar
                  </button>
                  <button className="mx-1 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded">
                    Remove Avatar
                  </button>
                </div>
              </div>
              <div>
                <ChromePicker disableAlpha />
              </div>
              <div>
                <h1>About Me</h1>
                <div>
                  <textarea
                    className="rounded"
                    name=""
                    id=""
                    cols="40"
                    rows="8"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="self-end mt-3 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default MyAccount;

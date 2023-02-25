import { AuthContext } from "contexts/AuthContext";
import { ChatContext } from "contexts/ChatContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import React, { useContext, useEffect, useState } from "react";
const ChatMessage = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [aboutMe, setAboutMe] = useState("");

  const findBio = async (data) => {
    if (data.user.uid) {
      const docRef = doc(db, "users", data.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setAboutMe(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    findBio(data);
  }, [data]);
  // console.log(aboutMe);
  return (
    <div
      className={`flex items-start ${
        message.senderId === currentUser.uid ? "owner" : null
      }`}
    >
      <img
        src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : aboutMe.photoURL
        }
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex flex-col w-1/2 rounded p-2 ">
        <div className="flex items-center p-2">
          <p className="text-lg font-medium text-neutral-100">
            {message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.displayName}
          </p>
          <p className="mx-1 text-zinc-400">
            {new Date(message.date.seconds * 1000).toLocaleString()}
          </p>
          {/* <p className=" text-zinc-400">11:32 PM</p> */}
        </div>
        <main className="flex flex-col bg-neutral-800 w-1/2 rounded p-2">
          <p className="text-lg font-medium text-neutral-100"></p>
          <p className="text-md text-white  w-1/2">{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </main>
      </div>
    </div>
  );
};

export default ChatMessage;

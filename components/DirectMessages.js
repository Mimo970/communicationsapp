import React, { useContext, useEffect, useState } from "react";
import Dm from "./Dm";
import DMSNavbar from "./DMSNavbar";
import UserFooter from "./UserFooter";
import DMSLayout from "./DMSLayout";
import { AuthContext } from "contexts/AuthContext";
import { ChatContext } from "contexts/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const DirectMessages = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(chats);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <>
      <div className="py-2 xxs:col-span-3 xs:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 bg-neutral-800 flex flex-col items-center ">
        <DMSLayout>
          <div className="flex flex-col overflow-y-scroll max-h-[45rem] ">
            <span className="py-2 text-lg bold">Direct Messages</span>
            {Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => (
                <div
                  className="flex items-center hover:bg-neutral-700 px-1 py-1 w-full rounded"
                  key={chat[0]}
                  onClick={() => handleSelect(chat[1].userInfo)}
                >
                  <img
                    src={chat[1].userInfo.photoURL}
                    className="rounded-full
                    w-11
                    h-11
                    object-center"
                  />
                  <div className="userChatInfo">
                    <span className="px-2 text-md font-semibold">
                      {chat[1].userInfo.displayName}
                    </span>
                    <p>{chat[1].lastMessage?.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </DMSLayout>
      </div>
    </>
  );
};

export default DirectMessages;

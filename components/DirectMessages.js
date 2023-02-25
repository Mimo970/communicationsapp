import React, { useContext, useEffect, useState } from "react";
import Dm from "./Dm";
import DMSNavbar from "./DMSNavbar";
import UserFooter from "./UserFooter";
import DMSLayout from "./DMSLayout";
import { AuthContext } from "contexts/AuthContext";
import { ChatContext } from "contexts/ChatContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const DirectMessages = () => {
  const [chats, setChats] = useState([]);
  const [usersArray, setUsersArray] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch, data } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      const docRef = doc(db, "userChats", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const chatData = docSnap.data();
        setChats(chatData);

        // Get all the unique user IDs from the chatData object
        const userIds = Object.values(chatData)
          .map((chat) => chat.userInfo.uid)
          .filter((value, index, self) => self.indexOf(value) === index);

        // Fetch the user data for each user ID
        const usersData = await Promise.all(
          userIds.map((userId) => getDoc(doc(db, "users", userId)))
        );

        // Extract the user data from the fetched documents and set it to state
        const usersArray = usersData
          .filter((docSnap) => docSnap.exists())
          .map((docSnap) => docSnap.data());
        setUsersArray(usersArray);
      } else {
        console.log("No such document!");
      }
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const getUser = (userId) => {
    return usersArray.find((user) => user.uid === userId);
  };

  return (
    <>
      <div className="primary-darker py-2 xxs:col-span-3 xs:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2  flex flex-col items-center ">
        <DMSLayout>
          <div className="  flex flex-col overflow-y-scroll max-h-[45rem] ">
            <span className="py-2 text-lg bold">Direct Messages</span>
            {Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => (
                <div
                  className="cursor-pointer flex items-center hover:bg-neutral-700 px-1 py-1 w-full rounded"
                  key={chat[0]}
                  onClick={() => handleSelect(chat[1]?.userInfo)}
                >
                  <img
                    src={getUser(chat[1]?.userInfo?.uid)?.photoURL}
                    className="rounded-full
                    w-11
                    h-11
                    object-center"
                  />
                  <div className="userChatInfo">
                    <span className="px-2 text-md font-semibold">
                      {getUser(chat[1]?.userInfo?.uid)?.displayName}
                    </span>
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

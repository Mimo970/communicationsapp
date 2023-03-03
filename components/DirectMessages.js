import React, { useContext, useEffect, useState } from "react";
import Dm from "./Dm";
import DMSNavbar from "./DMSNavbar";
import UserFooter from "./UserFooter";
import DMSLayout from "./DMSLayout";
import { AuthContext } from "contexts/AuthContext";
import { ChatContext } from "contexts/ChatContext";
import {
  deleteField,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, FieldValue } from "../firebase";
import { FiX } from "react-icons/fi";
// import firebase from "firebase/app";

const DirectMessages = () => {
  const [chats, setChats] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredChatIndex, setHoveredChatIndex] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch, data } = useContext(ChatContext);

  // console.log(data);

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

  // const handleDelete = async (uid) => {
  //   try {
  //     const chatRef = doc(db, "userChats", currentUser.uid);
  //     const chatDoc = await getDoc(chatRef);
  //     if (chatDoc.exists()) {
  //       const chatData = chatDoc.data();
  //       const chatId = Object.keys(chatData).find(
  //         (key) => chatData[key].uid === uid
  //       );
  //       if (chatId) {
  //         const chatUpdate = { ...chatData };
  //         delete chatUpdate[chatId].uid;
  //         await chatDoc.ref.update(chatUpdate);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error deleting chat:", error);
  //   }
  // };
  const handleDelete = async (uid) => {
    // console.log(uid);
    try {
      const docRef = doc(db, "userChats", currentUser.uid);
      console.log(docRef.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const combinedIdToDelete = Object.keys(data).find(
          (key) => key === isHovered
        );
        if (combinedIdToDelete) {
          await updateDoc(docRef, {
            // [combinedIdToDelete]: FieldValue.delete(),
            [combinedIdToDelete]: deleteField(),
          });
        }
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  console.log(currentUser.uid, isHovered);

  return (
    <>
      <div className="primary-darker py-2 xxs:col-span-3 xs:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2  flex flex-col items-center ">
        <DMSLayout>
          <div className="  flex flex-col overflow-y-scroll max-h-[45rem] ">
            <span className="py-2 text-lg bold">Direct Messages</span>
            {Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat, index) => (
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
                  {/* <div
                    onClick={handleDelete}
                    className="ml-auto px-3 py-1 rounded-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <FiX color={isHoveredIndex ? "red" : "black"} />
                  </div> */}
                  <div className="ml-auto px-3 py-1 rounded-full">
                    <FiX
                      color={isHovered === chat[0] ? "black" : "gray"}
                      onMouseEnter={() => setIsHovered(chat[0])}
                      onMouseLeave={() => setIsHovered(null)}
                      onClick={() => handleDelete(chat[1]?.uid)}
                    />
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

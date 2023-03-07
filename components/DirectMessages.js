import React, { useCallback, useContext, useEffect, useState } from "react";
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
import ChatMessage from "./ChatMessage";
// import { getServerSideProps } from "next";

const DirectMessages = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredChatIndex, setHoveredChatIndex] = useState(null);
  const [chats, setChats] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [isXHovered, setIsXHovered] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // useEffect(() => {
  //   const getChats = async () => {
  //     const docRef = doc(db, "userChats", currentUser.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const chatData = docSnap.data();
  //       setChats(chatData);

  //       const userIds = Object.values(chatData)
  //         .map((chat) => chat.userInfo.uid)
  //         .filter((value, index, self) => self.indexOf(value) === index);

  //       const usersData = await Promise.all(
  //         userIds.map((userId) => getDoc(doc(db, "users", userId)))
  //       );

  //       const usersArray = usersData
  //         .filter((docSnap) => docSnap.exists())
  //         .map((docSnap) => docSnap.data());
  //       setUsersArray(usersArray);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   };

  //   currentUser.uid && getChats();
  // }, [chats]);

  const { data } = useContext(ChatContext);

  const getChats = useCallback(() => {
    const docRef = doc(db, "userChats", currentUser.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const chatData = docSnap.data();
        setChats(chatData);

        const userIds = Object.values(chatData)
          .map((chat) => chat.userInfo.uid)
          .filter((value, index, self) => self.indexOf(value) === index);

        Promise.all(
          userIds.map((userId) => getDoc(doc(db, "users", userId)))
        ).then((usersData) => {
          const usersArray = usersData
            .filter((docSnap) => docSnap.exists())
            .map((docSnap) => docSnap.data());
          setUsersArray(usersArray);
        });
      } else {
        console.log("No such document!");
      }
    });
    return unsubscribe;
  }, [currentUser.uid]);

  useEffect(() => {
    if (currentUser.uid) {
      getChats();
    }
  }, [getChats, currentUser.uid]);

  useEffect(() => {
    const fetchData = async () => {
      if (chats) {
        const userIds = Object.values(chats)
          .map((chat) => chat.userInfo.uid)
          .filter((value, index, self) => self.indexOf(value) === index);

        const usersData = await Promise.all(
          userIds.map((userId) => getDoc(doc(db, "users", userId)))
        );

        const usersArray = usersData
          .filter((docSnap) => docSnap.exists())
          .map((docSnap) => docSnap.data());
        setUsersArray(usersArray);
      }
    };

    fetchData();
  }, [chats, setUsersArray]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  const handleNoUser = (u) => {
    dispatch({ type: "NO_USER", payload: u });
  };

  const getUser = (userId) => {
    return usersArray.find((user) => user.uid === userId);
  };

  const handleDelete = async (uid, event) => {
    // if (event && event.stopPropagation) {
    event.stopPropagation();
    // }
    console.log(event);
    // let clickedOnData =  data;
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
            [combinedIdToDelete]: deleteField(),
          });
        }
        handleNoUser();
        // console.log(clickedOnData);
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  // console.log(chats);
  // console.log(data);

  return (
    <>
      <div className="primary-darker py-2 xxs:col-span-3 xs:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2  flex flex-col items-center ">
        <DMSLayout>
          <div className="  flex flex-col overflow-y-scroll max-h-[45rem] ">
            <span className="py-2 text-lg bold">Direct Messages</span>
            {chats &&
              Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map(([chatId, chat], index) => {
                  const isChatHovered = isHovered === chatId;

                  return (
                    <div
                      className="cursor-pointer flex items-center hover:bg-neutral-700 px-1 py-1 w-full rounded"
                      key={chatId}
                      onClick={() => handleSelect(chat?.userInfo)}
                      onMouseEnter={() => setIsHovered(chatId)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <img
                        src={getUser(chat?.userInfo?.uid)?.photoURL}
                        className="rounded-full w-11 h-11 object-center"
                      />
                      <div className="userChatInfo">
                        <span className="px-2 text-md font-semibold">
                          {getUser(chat?.userInfo?.uid)?.displayName}
                        </span>
                      </div>

                      <div className="ml-auto px-3 py-1 rounded-full">
                        {isChatHovered && (
                          <FiX
                            color={isXHovered ? "black" : "gray"}
                            onMouseEnter={() => setIsXHovered(true)}
                            onMouseLeave={() => setIsXHovered(false)}
                            onClick={(event) => handleDelete(chat?.uid, event)}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
          </div>
        </DMSLayout>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="primary-darker py-2 xxs:col-span-3 xs:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2  flex flex-col items-center ">
  //       <DMSLayout>
  //         <div className="  flex flex-col overflow-y-scroll max-h-[45rem] ">
  //           <span className="py-2 text-lg bold">Direct Messages</span>
  //           {chats &&
  //             Object.entries(chats)
  //               ?.sort((a, b) => b[1].date - a[1].date)
  //               .map(([chatId, chat], index) => {
  //                 const isChatHovered = isHovered === chatId;
  //                 console.log(chatId, isHovered);

  //                 return (
  //                   <div
  //                     className="cursor-pointer flex items-center hover:bg-neutral-700 px-1 py-1 w-full rounded"
  //                     key={chatId}
  //                     onClick={() => handleSelect(chat?.userInfo)}
  //                     onMouseEnter={() => setIsHovered(chatId)}
  //                     onMouseLeave={() => setIsHovered(null)}
  //                   >
  //                     <img
  //                       src={getUser(chat?.userInfo?.uid)?.photoURL}
  //                       className="rounded-full w-11 h-11 object-center"
  //                     />
  //                     <div className="userChatInfo">
  //                       <span className="px-2 text-md font-semibold">
  //                         {getUser(chat?.userInfo?.uid)?.displayName}
  //                       </span>
  //                     </div>

  //                     <div className="ml-auto px-3 py-1 rounded-full">
  //                       {isChatHovered && (
  //                         <FiX
  //                           color="black"
  //                           onClick={() => handleDelete(chat?.uid)}
  //                         />
  //                       )}
  //                     </div>
  //                   </div>
  //                 );
  //               })}
  //         </div>
  //       </DMSLayout>
  //     </div>
  //   </>
  // );
};
export default DirectMessages;

export async function getServerSideProps({ req }) {
  const { currentUser } = await AuthContext.getServerSideProps({ req });
  // console.log(currentUser);
  const docRef = doc(db, "userChats", currentUser.uid);
  const docSnap = await getDoc(docRef);
  const chats = docSnap.exists() ? docSnap.data() : {};

  const userIds = Object.values(chats)
    .map((chat) => chat.userInfo.uid)
    .filter((value, index, self) => self.indexOf(value) === index);

  const usersData = await Promise.all(
    userIds.map((userId) => getDoc(doc(db, "users", userId)))
  );

  const usersArray = usersData
    .filter((docSnap) => docSnap.exists())
    .map((docSnap) => docSnap.data());
  console.log(chats);

  return {
    props: {
      chats,
      usersArray,
    },
  };
}

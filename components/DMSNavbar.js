import { AuthContext } from "contexts/AuthContext";
import { db } from "../firebase";
import Dm from "./Dm";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  orderBy,
  startAt,
  endAt,
  setDoc,
  getDoc,
  serverTimestamp,
  doc,
  writeBatch,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
const DMSNavbar = () => {
  const [showCard, setShowCard] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [usersFromQueryArray, setUsersFromQueryArray] = useState([]);
  const [hovered, setHovered] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleCard = () => {
    setShowCard(!showCard);
  };

  // const handleSearch = async () => {
  //   const q = query(
  //     collection(db, "users"),
  //     orderBy("displayName"),
  //     startAt(username.toLowerCase()),
  //     endAt(username.toLowerCase() + "\uf8ff")
  //   );

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     console.log(`Number of documents returned: ${querySnapshot.size}`);

  //     querySnapshot.forEach((doc) => {
  //       setUser(doc.data());
  //       console.log(doc.id, " => ", doc.data());
  //       console.log(user);
  //     });
  //     console.log(querySnapshot.empty);
  //     console.log(user);
  //   } catch (err) {
  //     console.log(err);
  //     setError(true);
  //   }
  //   // setUser(null);
  //   setUsername("");
  // };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      orderBy("displayName"),
      startAt(username.toLowerCase()),
      endAt(username.toLowerCase() + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      // console.log(`Number of documents returned: ${querySnapshot.size}`);

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
      setUser(users);
    } catch (err) {
      console.log(err);
      setError(true);
    }

    // setUser(null);
    setUsername("");
  };
  // user && console.log(user[0].uid);
  // user && console.log(user);

  const handleSelect = async () => {
    // Check whether the group (chats in Firestore) exists, if not create
    const combinedId =
      currentUser.uid > hovered.uid
        ? currentUser.uid + hovered.uid
        : hovered.uid + currentUser.uid;

    // console.log(user.uid);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      const selectedUserChatsRef = doc(db, "userChats", currentUser.uid);
      const selectedUserChatsDoc = await getDoc(selectedUserChatsRef);

      const chatInfo = selectedUserChatsDoc.data()[hovered.uid];
      // console.log(chatInfo);

      const currentUserChatsRef = doc(db, "userChats", currentUser.uid);

      // if (chatInfo) {
      //   // Access the chat information for the selected user
      //   const selectedUserChatDate = chatInfo.date;
      //   const selectedUserChatUserInfo = chatInfo.userInfo;
      // } else {
      //   // Chat information for selected user not found
      //   console.log("Chat information for selected user not found");
      // }

      if (!chatInfo) {
        await setDoc(
          currentUserChatsRef,
          {
            [combinedId]: {
              userInfo: {
                uid: hovered.uid,
                displayName: hovered.displayName,
                photoURL: hovered.photoURL,
                aboutMe: hovered.aboutMe || "",
                aboutMeColor: hovered.aboutMeColor || "",
                note: hovered.note || "",
              },
              date: serverTimestamp(),
            },
          },
          { merge: true }
        );
      }

      if (!res.exists()) {
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Add user info to userChats collection for current user

        const currentUserChatsDoc = await getDoc(currentUserChatsRef);

        if (currentUserChatsDoc.exists()) {
          // If userChats document for current user already exists, update it
          const batch = writeBatch(db);
          batch.update(currentUserChatsRef, {
            [combinedId + ".userInfo"]: {
              uid: hovered.uid,
              displayName: hovered.displayName,
              photoURL: hovered.photoURL,
              aboutMe: hovered.aboutMe || "",
              aboutMeColor: hovered.aboutMeColor || "",
              note: hovered.note || "",
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          await batch.commit();
        } else {
          // If userChats document for current user does not exist, create it
          await setDoc(
            currentUserChatsRef,
            {
              [combinedId]: {
                userInfo: {
                  uid: hovered.uid,
                  displayName: hovered.displayName,
                  photoURL: hovered.photoURL,
                  aboutMe: hovered.aboutMe || "",
                  aboutMeColor: hovered.aboutMeColor || "",
                  note: hovered.note || "",
                },
                date: serverTimestamp(),
              },
            },
            { merge: true }
          );
        }

        // Add user info to userChats collection for selected user
        const userChatsRef = doc(db, "userChats", hovered.uid);
        const userChatsDoc = await getDoc(userChatsRef);

        if (userChatsDoc.exists()) {
          // If userChats document for selected user already exists, update it
          const batch = writeBatch(db);
          batch.update(userChatsRef, {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              aboutMe: currentUser.aboutMe || "",
              aboutMeColor: currentUser.aboutMeColor || "",
              note: currentUser.note || "",
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          await batch.commit();
        } else {
          // If userChats document for selected user does not exist, create it
          await setDoc(
            userChatsRef,
            {
              [combinedId]: {
                userInfo: {
                  uid: currentUser.uid,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
                  aboutMe: currentUser.aboutMe || "",
                  aboutMeColor: currentUser.aboutMeColor || "",
                  note: currentUser.note || "",
                },
                date: serverTimestamp(),
              },
            },
            { merge: true }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }

    // setUser(null);
    setUsername("");
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // hovered && console.log(hovered.uid);

  return (
    <div className="flex justify-center border-b border-b-neutral-900 pb-2">
      <div className="relative ">
        <input
          onClick={handleCard}
          // type="search"
          className="cursor-pointer w-64 text-white placeholder-neutral-200  bg-neutral-900 rounded  p-1.5  focus:outline-none focus:shadow-outline"
          placeholder="Find or start a conversation "
        />
        {showCard && currentUser && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-neutral-900 bg-opacity-90">
            <div className=" bg-zinc-700 rounded-lg h-[24rem] w-[34rem] p-4">
              <div className="flex justify-between">
                <div>
                  <input
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    type="search"
                    name=""
                    id=""
                    className="bg-zinc-500 w-96 p-2 text-white rounded"
                    placeholder="Find or start a conversation "
                  />
                </div>
                <button
                  className="bg-zinc-600 hover:bg-zinc-800 text-white font-bold py-1.5 px-3 rounded"
                  onClick={handleClick}
                >
                  Search
                </button>
                <div>
                  <button onClick={handleCard}>
                    <MdOutlineCancel size={30} />
                  </button>
                </div>
              </div>
              <div>
                {user &&
                  user.map((u, index) => (
                    <div
                      onMouseEnter={() => setHovered(u)}
                      onMouseLeave={() => setHovered(null)}
                      className="py-1"
                      key={u.uid}
                      onClick={handleSelect}
                    >
                      <Dm
                        key={u.uid}
                        uid={u.uid}
                        displayName={u.displayName}
                        photoURL={u.photoURL}
                        handleCard={handleCard}
                      />
                    </div>
                  ))}
                {/* {user && (
                  <div
                    className="cursor-pointer mt-3 flex items-center hover:bg-neutral-800 px-1 py-1 w-full rounded"
                    onClick={handleSelect}
                  >
                    <img
                      className="rounded-full w-11 h-11 object-center"
                      src={user.photoURL}
                      alt=""
                    />
                    <span className="px-2 text-md font-semibold">
                      {user.displayName}
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DMSNavbar;

// const handleSelect = async () => {
//   //check whether the group(chats in firestore) exists, if not create
//   const combinedId =
//     currentUser.uid > user.uid
//       ? currentUser.uid + user.uid
//       : user.uid + currentUser.uid;
//   try {
//     const res = await getDoc(doc(db, "chats", combinedId));
//     // const res = await getDoc(doc(db, "userChats", currentUser.uid));

//     if (!res.exists()) {
//       //create a chat in chats collection
//       await setDoc(doc(db, "chats", combinedId), { messages: [] });

//       //create user chats
//       await updateDoc(doc(db, "userChats", currentUser.uid), {
//         [combinedId + ".userInfo"]: {
//           uid: user.uid,
//           displayName: user.displayName,
//           photoURL: user.photoURL,
//           aboutMe: user.aboutMe,
//           aboutMeColor: user.aboutMeColor,
//         },
//         [combinedId + ".date"]: serverTimestamp(),
//       });

//       await updateDoc(doc(db, "userChats", user.uid), {
//         [combinedId + ".userInfo"]: {
//           uid: currentUser.uid,
//           displayName: currentUser.displayName,
//           photoURL: currentUser.photoURL,
//           aboutMe: currentUser.aboutMe,
//           aboutMeColor: currentUser.aboutMeColor,
//         },
//         [combinedId + ".date"]: serverTimestamp(),
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   setUser(null);
//   setUsername("");
//   handleCard();
// };
// const handleSelect = async () => {
//   const combinedId =
//     currentUser.uid > user.uid
//       ? currentUser.uid + user.uid
//       : user.uid + currentUser.uid;

//   try {
//     const userChatsRef = doc(db, "chats", currentUser.uid);
//     const userChatsSnapshot = await getDoc(userChatsRef);
//     const userChatsData = userChatsSnapshot.data();
//     const chatRef = doc(db, "chats", combinedId);
//     const chatSnapshot = await getDoc(chatRef);

//     if (chatRef) {
//       // chat already exists, do nothing
//       setUser(null);
//       setUsername("");
//       handleCard();
//       return;
//     }

//     if (!chatSnapshot.exists()) {
//       // create a new chat
//       await setDoc(chatRef, { messages: [] });
//     }

//     // add the chat to currentUser's userChats
//     await updateDoc(userChatsRef, {
//       [combinedId]: {
//         userInfo: {
//           uid: user.uid,
//           displayName: user.displayName,
//           photoURL: user.photoURL,
//           aboutMe: user.aboutMe,
//           aboutMeColor: user.aboutMeColor,
//         },
//         date: serverTimestamp(),
//       },
//     });

//     // add the chat to the other user's userChats
//     const otherUserChatsRef = doc(db, "userChats", user.uid);
//     await updateDoc(otherUserChatsRef, {
//       [combinedId]: {
//         userInfo: {
//           uid: currentUser.uid,
//           displayName: currentUser.displayName,
//           photoURL: currentUser.photoURL,
//           aboutMe: currentUser.aboutMe,
//           aboutMeColor: currentUser.aboutMeColor,
//         },
//         date: serverTimestamp(),
//       },
//     });
//   } catch (err) {
//     console.error(err);
//   }

//   setUser(null);
//   setUsername("");
//   handleCard();
// };

// console.log(user, currentUser);
// setUser(null);

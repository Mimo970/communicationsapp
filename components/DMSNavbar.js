import { AuthContext } from "contexts/AuthContext";
import { db } from "../firebase";
import Dm from "./Dm";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
  getDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
const DMSNavbar = () => {
  const [showCard, setShowCard] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleCard = () => {
    setShowCard(!showCard);
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      console.log(`Number of documents returned: ${querySnapshot.size}`);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
      });
      console.log(querySnapshot.empty);
      console.log(user);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
    handleCard();
  };

  // console.log(user, username);

  return (
    <div className="flex justify-center border-b border-b-neutral-900 pb-2">
      <div className="relative ">
        <input
          onClick={handleCard}
          type="search"
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
                    className="w-96 p-2 text-white"
                    placeholder="Find or start a conversation "
                  />
                </div>
                <button onClick={handleClick}>Search</button>
                <div>
                  <button onClick={handleCard}>
                    <MdOutlineCancel />
                  </button>
                </div>
              </div>
              <div>
                {user && (
                  <div
                    className="flex items-center hover:bg-neutral-700 px-1 py-1 w-full rounded"
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DMSNavbar;

{
  /* <div>
                    <img className="w-14" src={user.photoURL} alt="" />
                    <span>{user.displayName}</span>
                  </div> */
}

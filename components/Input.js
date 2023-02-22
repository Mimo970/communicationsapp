import { useContext, useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { BsPaperclip } from "react-icons/bs";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ChatContext } from "../contexts/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { AuthContext } from "contexts/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  const handleSend = async (e) => {
    // e.preventDefault();

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        // messageDate: Timestamp.now(),
        img: url || "",
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <ErrorBoundary>
      <div className="flex items-center bg-zinc-900 m-3 p-2 rounded-md">
        <input
          type="text"
          className="w-full bg-neutral-900 rounded text-white p-1.5 focus:outline-none focus:shadow-outline"
          placeholder="Message @user"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
        />
        <div className="flex items-center">
          <BsPaperclip className="icons cursor-pointer" />
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
            id="file"
          />
          <label htmlFor="file">
            <MdAddPhotoAlternate className="icons mx-1 cursor-pointer" />
          </label>
          <button
            onClick={handleSend}
            className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Input;

import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const ChatMessages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  // console.log(data);
  // h-[45rem]
  return (
    <div className=" h-[45rem] overflow-y-scroll p-3">
      {messages.map((m) => (
        <ChatMessage message={m} key={m.id} />
      ))}
    </div>
  );
};
export default ChatMessages;

// import { AuthContext } from "../contexts/AuthContext";
// import { ChatContext } from "../contexts/ChatContext";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import ChatMessage from "./ChatMessage";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";

// const ChatMessages = () => {
//   const { data } = useContext(ChatContext);
//   const [messages, setMessages] = useState([]);
//   const chatBottomRef = useRef();

//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
//       doc.exists() && setMessages(doc.data().messages);
//     });
//     return unsubscribe;
//   }, [data.chatId]);

//   const handleNewMessage = () => {
//     chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="overflow-y-scroll p-3">
//       {messages.map((m) => (
//         <ChatMessage message={m} key={m.id} />
//       ))}
//       <div ref={chatBottomRef} onChange={handleNewMessage}></div>
//     </div>
//   );
// };

// export default ChatMessages;

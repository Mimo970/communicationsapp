// import { AuthContext } from "../contexts/AuthContext";
// import { ChatContext } from "../contexts/ChatContext";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import ChatMessage from "./ChatMessage";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";
// const ChatMessages = () => {
//   const { data } = useContext(ChatContext);
//   const [messages, setMessages] = useState([]);
//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   {
//     data.chatId &&
//       data.chatId !== "null" &&
//       useEffect(() => {
//         const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
//           doc.exists() && setMessages(doc.data().messages);
//         });
//         return () => {
//           unsub();
//         };
//       }, [data.chatId]);
//   }
//   // console.log(data);
//   // h-[45rem]
//   return (
//     <div className="h-[45rem] overflow-y-scroll p-3 ">
//       {messages.map((m) => (
//         <ChatMessage message={m} key={m.id} />
//       ))}
//     </div>
//   );
// };
// export default ChatMessages;

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
    if (data.chatId && data.chatId !== "null") {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    }
  }, [data.chatId]);
  // data.INITIAL_STATE && console.log(data.INITIAL_STATE.chatId);

  return (
    <div className="h-[45rem] overflow-y-scroll p-3 ">
      {data.INITIAL_STATE && data.INITIAL_STATE.chatId === "null" ? (
        <div></div>
      ) : (
        messages.map((m) => <ChatMessage message={m} key={m.id} />)
      )}

      {/* <div ref={ref}></div> */}
    </div>
  );
};

export default ChatMessages;

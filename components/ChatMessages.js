import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import React, { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const ChatMessages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="overflow-y-scroll p-3">
      {messages.map((m) => (
        <ChatMessage message={m} key={m.id} />
      ))}
    </div>
  );
};
export default ChatMessages;

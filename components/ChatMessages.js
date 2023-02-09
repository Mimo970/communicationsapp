import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
const ChatMessages = () => {
  return (
    <div className="overflow-y-scroll p-3">
      <ChatMessage />
      <ChatMessage />
    </div>
  );
};
export default ChatMessages;

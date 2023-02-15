import "@/styles/globals.css";
import "../styles/chat.css";
import { AuthContextProvider } from "contexts/AuthContext";
import { ChatContextProvider } from "contexts/ChatContext";
export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

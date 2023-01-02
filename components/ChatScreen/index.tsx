import Sidebar from "./Sidebar";
import styles from "./style.module.scss";
import { useState } from "react";
import RequestsSidebar from "./Sidebar/RequestsSidebar";
import ChatsSidebar from "./Sidebar/ChatSidebar";
import { Chat } from "../../interfaces";
import { useEffect } from "react";
import ChatBox from "./ChatBox";
import NoChat from "./ChatBox/NoChat";
export default function ChatScreen() {
  const [mode, setMode] = useState<number>(0); //0: chat, 1: friend requests
  const [selectedChat, setSelectedChat] = useState<Chat>();
  useEffect(() => {
    if (mode === 1) setSelectedChat(null);
  }, [mode]);
  return (
    <div id={styles.chatscreen}>
      <Sidebar mode={mode} setMode={setMode} />
      {mode ? (
        <RequestsSidebar />
      ) : (
        <ChatsSidebar
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      )}
      {selectedChat && !mode ? <ChatBox chatData={selectedChat} /> : <NoChat />}
    </div>
  );
}

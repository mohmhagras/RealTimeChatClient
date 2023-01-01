import Sidebar from "./Sidebar";
import styles from "./style.module.scss";
import { useState } from "react";
import RequestsSidebar from "./Sidebar/RequestsSidebar";
import ChatsSidebar from "./Sidebar/ChatSidebar";
export default function ChatScreen() {
  const [mode, setMode] = useState<number>(0); //0: chat, 1: friend requests
  return (
    <div id={styles.chatscreen}>
      <Sidebar mode={mode} setMode={setMode} />
      {mode ? <RequestsSidebar /> : <ChatsSidebar />}
    </div>
  );
}

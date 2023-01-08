import { Chat, Message } from "../../../interfaces";
import styles from "./style.module.scss";
import MessageBox from "./Message";
import { FiSend } from "react-icons/fi";
import { useEffect, useContext, useRef, useState, useMemo } from "react";
import { userContext, chatScreenContext } from "../../../Contexts";
import Title from "./Title";
const viewport = require("viewport-dimensions");

export default function ChatBox({
  chatData,
  sendMessage,
}: {
  chatData: Chat;
  sendMessage: Function;
}) {
  const screenWidth = viewport.width();
  const lastMessageRef = useRef<HTMLInputElement>();
  const { user } = useContext(userContext);
  const { displayMode } = useContext(chatScreenContext);
  const [currentMessage, setCurrentMessage] = useState("");

  const { messages, usernames } = chatData;

  const otherUsername = useMemo(
    () => usernames.find((username) => username !== user?.username),
    [usernames]
  );

  const otherUser = useMemo(
    () => user?.friends.find(({ username }) => username === otherUsername),
    [otherUsername]
  );

  const handleSendClick = () => {
    sendMessage(otherUsername, currentMessage);
    setCurrentMessage("");
  };
  const handleKeyUp = (event: any) => {
    if (event.key === "Enter") {
      sendMessage(otherUsername, currentMessage);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (lastMessageRef) {
      lastMessageRef.current?.scrollIntoView();
    }
  }, [messages]);

  return (
    <section
      className={`vertical-container ${styles["chat-box"]} ${
        displayMode
          ? displayMode < 3
            ? styles["two-sidebars-width"]
            : styles["no-sidebar-width"]
          : styles["one-sidebar-width"]
      } ${screenWidth < 670 || !displayMode ? styles["title-bar-exists"] : ""}`}
    >
      {screenWidth < 670 || !displayMode ? <Title friend={otherUser!} /> : null}
      {messages.map((msg, index) => {
        return (
          <MessageBox
            message={msg}
            key={index}
            lastMessageRef={
              index === messages.length - 1 ? lastMessageRef : null
            }
          />
        );
      })}
      <div
        className={`${styles["text-box"]} ${
          displayMode
            ? displayMode < 3
              ? styles["two-sidebars-width"]
              : styles["no-sidebar-width"]
            : styles["one-sidebar-width"]
        }`}
      >
        <input
          type="text"
          placeholder="Type something..."
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button onClick={handleSendClick} disabled={currentMessage == ""}>
          <FiSend className="icon" />
          Send
        </button>
      </div>
    </section>
  );
}

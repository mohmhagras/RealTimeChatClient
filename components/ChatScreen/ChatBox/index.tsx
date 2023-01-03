import { Chat, Message } from "../../../interfaces";
import styles from "./style.module.scss";
import MessageBox from "./Message";
import { FiSend } from "react-icons/fi";
import { useEffect, useContext, useRef, useState } from "react";
import { userContext } from "../../../Context/UserContext";

export default function ChatBox({
  chatData,
  sendMessage,
  mode,
}: {
  chatData: Chat;
  sendMessage: Function;
  mode: number;
}) {
  const lastMessageRef = useRef<HTMLInputElement>();
  const { user } = useContext(userContext);
  const [currentMessage, setCurrentMessage] = useState("");

  const { messages, usernames } = chatData;

  const otherUsername = usernames.find(
    (username) => username !== user.username
  );

  const handleSendClick = () => {
    sendMessage(otherUsername, currentMessage);
    setCurrentMessage("");
  };
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      sendMessage(otherUsername, currentMessage);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (lastMessageRef) {
      lastMessageRef.current.scrollIntoView();
    }
  });

  return (
    <section
      className={`vertical-container ${styles["chat-box"]} ${
        mode
          ? mode < 3
            ? styles["two-sidebars-width"]
            : styles["no-sidebars-width"]
          : styles["one-sidebar-width"]
      }`}
    >
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
          mode
            ? mode < 3
              ? styles["two-sidebars-width"]
              : styles["no-sidebars-width"]
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

import styles from "../style.module.scss";
import { useContext } from "react";
import { userContext } from "../../../../Context/UserContext";
import Image from "next/image";
import userIcon from "../../../../public/images/user-black.png";
import viewport from "viewport-dimensions";

export default function ChatsSidebar({ chats, setMode }) {
  const { user, selectedChat, setSelectedChat } = useContext(userContext);

  function handleClickOnChat(username: string) {
    setSelectedChat(username);
    if (viewport.width() < 670) {
      setMode(3);
    }
  }
  return (
    <aside className={styles.sidebar} id={styles["chats-sidebar"]}>
      {chats?.map((chat, index) => {
        const otherUser = user?.friends?.find(({ username }) => {
          return chat.usernames.includes(username);
        });

        const secondLineText = (): string => {
          const messagesLength = chat.messages.length;
          if (!messagesLength) {
            return "No messages";
          }
          const lastMessage = chat.messages[messagesLength - 1];
          return `${lastMessage.fromUser === user?.username ? "You:" : ""} ${
            lastMessage.text
          }`;
        };
        return (
          <div
            className={`horizontal-left-aligned-container ${
              styles["chat-item"]
            } ${
              selectedChat === otherUser?.username ? styles["-selected"] : ""
            }`}
            key={index}
            onClick={() => handleClickOnChat(otherUser.username)}
          >
            <Image
              src={otherUser?.imageUrl || userIcon}
              width={50}
              height={50}
              alt="logo"
              className="user-image"
            />
            <div className="vertical-left-aligned-container">
              <h3>{otherUser?.username}</h3>
              <p>{secondLineText()}</p>
            </div>
          </div>
        );
      })}
      {!chats?.length ? (
        <h3 style={{ padding: "24px 16px" }}>No chats yet.</h3>
      ) : null}
    </aside>
  );
}

import styles from "../style.module.scss";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../../../Context/UserContext";
import { Chat } from "../../../../interfaces";
import Image from "next/image";
import userIcon from "../../../../public/images/user-black.png";
export default function ChatsSidebar({ selectedChat, setSelectedChatChat }) {
  const { token, user } = useContext(userContext);
  const [chats, setChats] = useState<Array<Chat>>();
  const fetchChats = async () => {
    const response = await fetch("https://localhost:7298/api/User/getchats", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 400) {
      alert(await response.text());
      return;
    }
    setChats(await response.json());
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <aside className={styles.sidebar} id={styles["chats-sidebar"]}>
      {chats?.map((chat, index) => {
        const otherUser = user?.friends?.find(({ username }) => {
          return chat.usernames.includes(username);
        });
        return (
          <div
            className={`horizontal-left-aligned-container ${
              styles["chat-item"]
            } ${selectedChat?.id === chat.id ? styles["-selected"] : ""}`}
            key={index}
            onClick={() => setSelectedChatChat(chat)}
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
              <p>{` ${chat.messages[chat.messages.length - 1].text} `}</p>
            </div>
          </div>
        );
      })}
      {!chats?.length ? <h3>No chats yet.</h3> : null}
    </aside>
  );
}

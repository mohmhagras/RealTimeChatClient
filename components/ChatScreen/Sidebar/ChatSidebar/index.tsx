import styles from "../style.module.scss";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../../../Context/UserContext";
import { Chat, Message } from "../../../../interfaces";
import Image from "next/image";
import userIcon from "../../../../public/images/user-black.png";
export default function ChatsSidebar({ selectedChat, setSelectedChat }) {
  const { token, user, newChat, setNewChat, setExistingChats } =
    useContext(userContext);
  const newChatObject: Chat = {
    usernames: [newChat, user?.username],
    messages: [],
  };
  const [chats, setChats] = useState<Array<Chat>>([]);
  const fetchChats = async () => {
    if (!newChat.length) {
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
    }
    setNewChat("");
  };

  useEffect(() => {
    fetchChats();
  }, [selectedChat]);

  useEffect(() => {
    if (newChat?.length) {
      setChats((prevState) => [...prevState, newChatObject]);
      setSelectedChat(newChatObject);
    }
  }, [newChat]);

  useEffect(() => {
    if (chats.length) {
      setExistingChats([]);
      chats.forEach(({ usernames }) => {
        const otherUsername = usernames.find((name) => name != user?.username);
        setExistingChats((prevState) => [...prevState, otherUsername]);
      });
    }
  }, [chats]);

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
            } ${selectedChat?.id === chat.id ? styles["-selected"] : ""}`}
            key={index}
            onClick={() => setSelectedChat(chat)}
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

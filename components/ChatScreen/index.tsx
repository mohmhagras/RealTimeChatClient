import Sidebar from "./Sidebar";
import styles from "./style.module.scss";
import { useContext, useState, useEffect, useMemo } from "react";
import RequestsSidebar from "./Sidebar/RequestsSidebar";
import ChatsSidebar from "./Sidebar/ChatSidebar";
import { Chat, Message } from "../../interfaces";
import ChatBox from "./ChatBox";
import NoChat from "./ChatBox/NoChat";
import { userContext } from "../../Context/UserContext";
const signalR = require("@microsoft/signalr");

export default function ChatScreen() {
  const { token, user, newChat, setNewChat, setExistingChats } =
    useContext(userContext);
  const [mode, setMode] = useState<number>(0); //0: chat, 1: friend requests
  const [selectedChat, setSelectedChat] = useState<string>(); //other username of selected chat
  const [chats, setChats] = useState<Array<Chat>>([]);
  const [newMessages, setNewMessages] = useState([]);
  const newChatObject: Chat = {
    usernames: [newChat, user?.username],
    messages: [],
  };

  let connection = useMemo(() => {
    return new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7298/chathub", {
        accessTokenFactory: () => token,
      })
      .build();
  }, []);

  const invokeSendMessage = (
    otherUsername: string,
    currentMessage: Message
  ) => {
    connection.invoke("SendMessage", otherUsername, currentMessage);
    return;
  };

  function saveMessage(message: Message, reciever: String) {
    const otherUsername: string =
      message.fromUser === user.username ? reciever : user.username;
    const chatsCopy: Array<Chat> = chats;

    const index = chats.findIndex((chat) =>
      chat.usernames.includes(otherUsername)
    );
    chatsCopy[index].messages.push(message);
    setChats([...chatsCopy]);
  }

  useEffect(() => {
    if (newMessages.length) {
      saveMessage(newMessages[0].message, newMessages[0].reciever);
      newMessages.shift();
    }
  }, [newMessages]);

  useEffect(() => {
    try {
      connection.on("receiveMessage", (message: Message, reciever: String) =>
        setNewMessages((prevState) => [...prevState, { message, reciever }])
      );

      connection.start();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      setSelectedChat(newChat);
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
          chats={chats}
        />
      )}
      {selectedChat && !mode ? (
        <ChatBox
          chatData={chats.find((chat) => chat.usernames.includes(selectedChat))}
          sendMessage={invokeSendMessage}
        />
      ) : (
        <NoChat />
      )}
    </div>
  );
}

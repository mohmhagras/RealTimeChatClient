import Sidebar from "./FirstSidebar";
import styles from "./style.module.scss";
import { useContext, useState, useEffect, useMemo } from "react";
import RequestsSidebar from "./SecondSidebar/RequestsSidebar";
import ChatsSidebar from "./SecondSidebar/ChatSidebar";
import { Chat, Message } from "../../interfaces";
import ChatBox from "./ChatBox";
import NoChat from "./ChatBox/NoChat";
import { userContext, chatScreenContext } from "../../Contexts";
import { useRouter } from "next/router";
const signalR = require("@microsoft/signalr");
const viewport = require("viewport-dimensions");

interface NewMessage {
  message: Message;
  reciever: string;
}

export default function ChatScreen() {
  const screenWidth = viewport.width();
  const router = useRouter();
  const { token, user } = useContext(userContext);
  const {
    newChat,
    setNewChat,
    setExistingChats,
    selectedChat,
    setSelectedChat,
    displayMode,
  } = useContext(chatScreenContext);
  const [chats, setChats] = useState<Array<Chat>>([]);
  const [newMessages, setNewMessages] = useState<Array<NewMessage>>([]);
  const newChatObject: Chat = {
    usernames: [newChat, user?.username!],
    messages: [],
  };

  let connection = useMemo(() => {
    return new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SERVER_URL}/chathub`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();
  }, []);

  const invokeSendMessage = (
    otherUsername: string,
    currentMessage: Message
  ) => {
    try {
      connection.invoke("SendMessage", otherUsername, currentMessage);
      return;
    } catch (error) {
      alert(error);
      router.reload();
    }
  };

  function saveMessage(message: Message, reciever: string) {
    if (!chats.length) router.reload();
    const otherUsername: string =
      message.fromUser === user?.username ? reciever : message.fromUser;
    console.log(otherUsername);
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
      connection.on("receiveMessage", (message: Message, reciever: string) =>
        setNewMessages((prevState) => [...prevState, { message, reciever }])
      );
      connection.start();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function fetchChats() {
    if (!newChat.length) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Chat/getuserchats`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 400) {
        alert(await response.text());
        return;
      }
      setChats(await response.json());
      return;
    }
    setNewChat("");
  }

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

  const shouldRenderChatBox = (): boolean => {
    if (screenWidth > 1000) {
      return true;
    } else if (screenWidth > 670 && !displayMode) {
      return true;
    } else if (displayMode === 3) {
      return true;
    } else {
      return false;
    }
  };

  const shouldRenderFirstSidebar = (): boolean => {
    if (!displayMode) {
      return true;
    } else if (screenWidth > 670 && displayMode < 3) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id={styles.chatscreen}>
      {shouldRenderFirstSidebar() ? <Sidebar /> : null}
      {displayMode ? (
        displayMode === 1 ? (
          <ChatsSidebar chats={chats} />
        ) : displayMode === 2 ? (
          <RequestsSidebar />
        ) : null
      ) : null}
      {selectedChat && shouldRenderChatBox() ? (
        <ChatBox
          chatData={
            chats.find((chat) => chat.usernames.includes(selectedChat)) as Chat
          }
          sendMessage={invokeSendMessage}
        />
      ) : shouldRenderChatBox() ? (
        <NoChat />
      ) : null}
    </div>
  );
}

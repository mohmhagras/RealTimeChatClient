import { Chat, Message } from "../../../interfaces";
import styles from "./style.module.scss";
import MessageBox from "./Message";
import { FiSend } from "react-icons/fi";
import {
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  KeyboardEventHandler,
} from "react";
import { userContext } from "../../../Context/UserContext";
import { useDeferredValue } from "react";
const signalR = require("@microsoft/signalr");

export default function ChatBox({ chatData }: { chatData: Chat }) {
  const lastMessageRef = useRef<HTMLInputElement>();
  const { token, user } = useContext(userContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<Message>>(
    chatData.messages
  );
  const otherUsername = chatData.usernames.find(
    (username) => username !== user.username
  );
  let connection = useMemo(() => {
    return new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7298/chathub", {
        accessTokenFactory: () => token,
      })
      .build();
  }, []);

  const handleSendClick = () => {
    connection.invoke("sendMessage", otherUsername, currentMessage);
    setCurrentMessage("");
  };
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      connection.invoke("sendMessage", otherUsername, currentMessage);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    try {
      connection.on("sendMessage", (data: Message) => {
        if (chatData.usernames.includes(data.fromUser))
          setChatMessages((prevState) => [...prevState, data]);
      });

      connection.start();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setChatMessages(chatData.messages);
  }, [chatData]);

  useEffect(() => {
    if (chatMessages.length) lastMessageRef.current.scrollIntoView();
  }, [chatMessages]);

  return (
    <section className="vertical-container" id={styles["chat-box"]}>
      {chatMessages.map((msg, index) => {
        return (
          <MessageBox
            message={msg}
            key={index}
            lastMessageRef={
              index === chatMessages.length - 1 ? lastMessageRef : null
            }
          />
        );
      })}
      <div id={styles["text-box"]}>
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

import { Chat, Message } from "../../../interfaces";
import styles from "./style.module.scss";
import MessageBox from "./Message";
import { FiSend } from "react-icons/fi";
import { useEffect, useContext, useRef, useState, useMemo } from "react";
import { userContext } from "../../../Context/UserContext";
export default function ChatBox({ chatData }: { chatData: Chat }) {
  const signalR = require("@microsoft/signalr");
  const messageRef = useRef<HTMLInputElement>();
  const { token, user } = useContext(userContext);
  const chat = { ...chatData };
  const [count, setCount] = useState<number>(0);
  const otherUsername = chatData.usernames.find(
    (username) => username !== user.username
  );
  let connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7298/chathub", {
      accessTokenFactory: () => token,
    })
    .build();

  const handleSendClick = () => {
    connection.invoke("sendMessage", otherUsername, messageRef.current.value);
    messageRef.current.value = "";
  };

  useEffect(() => {
    try {
      connection.on("sendMessage", (data: Message) => {
        chat.messages.push(data);
      });

      connection.start();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [chat]);

  return (
    <section className="vertical-container" id={styles["chat-box"]}>
      {chat.messages.map((msg, index) => {
        return <MessageBox message={msg} key={index} />;
      })}
      <div id={styles["text-box"]}>
        <input type="text" placeholder="Type something..." ref={messageRef} />
        <button onClick={handleSendClick}>
          <FiSend className="icon" />
          Send
        </button>
      </div>
    </section>
  );
}

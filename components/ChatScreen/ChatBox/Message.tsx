import { Message } from "../../../interfaces";
import { useContext } from "react";
import { userContext } from "../../../Contexts";
import styles from "./style.module.scss";
import { MutableRefObject } from "react";
export default function MessageBox({
  message,
  lastMessageRef,
}: {
  message: Message;
  lastMessageRef?: MutableRefObject<HTMLInputElement>;
}) {
  const { user } = useContext(userContext);
  const sentAt = new Date(message.sentAt);
  const getDisplayDate = () => {
    const now = new Date(Date.now());
    if (
      sentAt.getDate() === now.getDate() &&
      sentAt.getMonth() === now.getMonth() &&
      sentAt.getFullYear() === now.getFullYear()
    ) {
      return sentAt.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return sentAt.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };
  return (
    <div
      className={`
        ${styles["message-from"]} ${
        user?.username === message.fromUser
          ? styles["-user"]
          : styles["-otherUser"]
      } `}
      ref={lastMessageRef}
    >
      <p>{message.text}</p>
      <p className={styles["date"]}>{getDisplayDate()}</p>
    </div>
  );
}

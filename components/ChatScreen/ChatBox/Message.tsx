import { Message } from "../../../interfaces";
import { useContext } from "react";
import { userContext } from "../../../Context/UserContext";
import styles from "./style.module.scss";
export default function MessageBox({ message }: { message: Message }) {
  const { user } = useContext(userContext);
  const sentAt = new Date(message.sentAt);
  return (
    <div
      className={`
        ${styles["message-from"]} ${
        user.username === message.fromUser
          ? styles["-user"]
          : styles["-otherUser"]
      } `}
    >
      <p>{message.text}</p>
      <p className={styles["date"]}>
        {sentAt.toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}

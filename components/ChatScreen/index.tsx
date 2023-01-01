import Sidebar from "./Sidebar";
import styles from "./style.module.scss";
export default function ChatScreen() {
  return (
    <div id={styles.chatscreen}>
      <Sidebar />
    </div>
  );
}

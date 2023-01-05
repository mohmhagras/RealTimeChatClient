import styles from "./style.module.scss";
import { useContext } from "react";
import { chatScreenContext } from "../../../Contexts";
export default function NoChat() {
  const { displayMode } = useContext(chatScreenContext);
  return (
    <section
      className={`vertical-center-aligned-container ${styles["chat-box"]} ${
        displayMode
          ? displayMode < 3
            ? styles["two-sidebars-width"]
            : styles["no-sidebars-width"]
          : styles["one-sidebar-width"]
      }`}
    >
      <h2>Select a chat or start a new one.</h2>
    </section>
  );
}

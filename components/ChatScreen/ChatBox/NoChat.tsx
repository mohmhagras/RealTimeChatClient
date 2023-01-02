import styles from "./style.module.scss";
export default function NoChat() {
  return (
    <section
      className="vertical-center-aligned-container"
      id={styles["chat-box"]}
    >
      <h2>Select a chat or start a new one.</h2>
    </section>
  );
}

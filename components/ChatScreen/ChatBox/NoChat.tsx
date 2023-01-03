import styles from "./style.module.scss";
export default function NoChat({ mode }: { mode: number }) {
  return (
    <section
      className={`vertical-center-aligned-container ${styles["chat-box"]} ${
        mode
          ? mode < 3
            ? styles["two-sidebars-width"]
            : styles["no-sidebars-width"]
          : styles["one-sidebar-width"]
      }`}
    >
      <h2>Select a chat or start a new one.</h2>
    </section>
  );
}

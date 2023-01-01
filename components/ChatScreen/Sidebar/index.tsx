import SidebarItem from "./SidebarItem";
import styles from "./style.module.scss";
export default function Sidebar() {
  const mode: number = 0; //0: chat, 1: friend requests
  return (
    <aside className={styles.sidebar}>
      <section>
        <SidebarItem index={0} isSelected={!mode} />
        <SidebarItem index={1} isSelected={mode === 1} />
      </section>
      <SidebarItem index={2} isSelected={mode === 2} />
    </aside>
  );
}

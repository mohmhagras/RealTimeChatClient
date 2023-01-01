import SidebarItem from "./SidebarItem";
import styles from "./style.module.scss";
import { useContext, useState } from "react";
import { userContext } from "../../../Context/UserContext";
import { useEffect } from "react";
import FriendsList from "./FriendsList";

export default function Sidebar() {
  const { user } = useContext(userContext);

  const [mode, setMode] = useState<number>(0); //0: chat, 1: friend requests

  return (
    <aside className={styles.sidebar}>
      <section>
        <SidebarItem index={0} isSelected={!mode} onClick={() => setMode(0)} />
        <SidebarItem
          index={1}
          isSelected={mode === 1}
          onClick={() => setMode(1)}
        />
      </section>
      <SidebarItem
        index={2}
        isSelected={mode === 2}
        numberOfFriends={user?.friends?.length || 0}
      />
      <FriendsList friends={user?.friends} />
    </aside>
  );
}

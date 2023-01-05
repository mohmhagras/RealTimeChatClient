import SidebarItem from "./SidebarItem";
import styles from "../Sidebars.module.scss";
import { useContext } from "react";
import { userContext, chatScreenContext } from "../../../Contexts";
import FriendsList from "./Friends/FriendsList";
import FriendsTitle from "./Friends/FriendsTitle";

export default function Sidebar() {
  const { user } = useContext(userContext);
  const { displayMode, setDisplayMode } = useContext(chatScreenContext);

  return (
    <aside className={styles.sidebar}>
      <section>
        <h3 className={styles.welcome}>
          Welcome, <strong>{user?.username}</strong>
        </h3>
        <SidebarItem
          index={0}
          isSelected={displayMode === 1}
          onClick={() => {
            displayMode === 1 ? setDisplayMode(0) : setDisplayMode(1);
          }}
        />
        <SidebarItem
          index={1}
          isSelected={displayMode === 2}
          onClick={() => {
            displayMode === 2 ? setDisplayMode(0) : setDisplayMode(2);
          }}
        />
      </section>
      <FriendsTitle numberOfFriends={user?.friends?.length || 0} />
      <FriendsList friends={user?.friends} />
    </aside>
  );
}

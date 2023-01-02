import { Friend } from "../../../interfaces";
import Image from "next/image";
import styles from "./style.module.scss";
import userIcon from "../../../public/images/user-black.png";
import { useContext } from "react";
import { userContext } from "../../../Context/UserContext";
export default function FriendsList({
  friends,
  setMode,
}: {
  friends: Array<Friend>;
  setMode: any;
}) {
  const { setNewChat } = useContext(userContext);

  const handleClickOnFriend = (username) => {
    setMode(0);
    setNewChat(username);
  };
  return (
    <div>
      {friends?.map((friend, index) => {
        return (
          <div
            className={`horizontal-left-aligned-container ${styles["friend-item"]}`}
            key={index}
            onClick={() => handleClickOnFriend(friend.username)}
          >
            <Image
              src={friend.imageUrl || userIcon}
              width={35}
              height={35}
              alt="logo"
              className="user-image"
            />
            <h3>{friend.username}</h3>
          </div>
        );
      })}
    </div>
  );
}

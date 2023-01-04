import { Friend } from "../../../interfaces";
import Image from "next/image";
import styles from "./style.module.scss";
import userIcon from "../../../public/images/user-black.png";
import { useContext } from "react";
import { userContext } from "../../../Context/UserContext";
import viewport from "viewport-dimensions";

export default function FriendsList({
  friends,
  setMode,
}: {
  friends: Array<Friend>;
  setMode: any;
}) {
  const { setNewChat, existingChats, setSelectedChat } =
    useContext(userContext);

  const handleClickOnFriend = (username) => {
    if (viewport.width() < 670) {
      setMode(3);
    } else {
      setMode(1);
    }
    if (!existingChats.includes(username)) {
      setNewChat(username);
    } else {
      setSelectedChat(username);
    }
  };
  return (
    <div style={{ overflowY: "scroll" }}>
      {friends?.map((friend, index) => {
        console.log(friend.imageUrl);
        return (
          <div
            className={`horizontal-left-aligned-container ${styles["friend-item"]}`}
            key={index}
            onClick={() => handleClickOnFriend(friend.username)}
          >
            <Image
              src={friend.imageUrl === "" ? userIcon : friend.imageUrl}
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

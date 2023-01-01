import { Friend } from "../../../interfaces";
import Image from "next/image";
import styles from "./style.module.scss";
export default function FriendsList({ friends }: { friends: Array<Friend> }) {
  return (
    <div>
      {friends?.map((friend, index) => {
        return (
          <div
            className={`horizontal-left-aligned-container ${styles["friend-item"]}`}
            key={index}
          >
            <Image
              src={friend.imageUrl}
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

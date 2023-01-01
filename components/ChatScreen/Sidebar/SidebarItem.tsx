import styles from "./style.module.scss";
import {
  BsChatSquareDots,
  BsChatSquareDotsFill,
  BsPlus,
  BsX,
} from "react-icons/bs";
import { HiUsers, HiOutlineUsers } from "react-icons/hi2";
import { ReactElement } from "react";
import { MouseEventHandler } from "react";
import { useState } from "react";
import FriendRequest from "./FriendRequest";
interface sidebarItems {
  outlineIcon: ReactElement;
  filledIcon: ReactElement;
  text: string;
}

export default function SidebarItem({
  index,
  isSelected,
  numberOfFriends,
  onClick,
}: {
  index: number;
  isSelected: boolean;
  numberOfFriends?: number;
  onClick?: MouseEventHandler;
}) {
  const [showFriendRequestBox, setShowFriendRequestBox] =
    useState<boolean>(false);

  const items: Array<sidebarItems> = [
    {
      text: "Chats",
      outlineIcon: <BsChatSquareDots className="icon-spaced" />,
      filledIcon: <BsChatSquareDotsFill className="icon-spaced" />,
    },
    {
      text: "Friend Requests",
      outlineIcon: <HiOutlineUsers className="icon-spaced" />,
      filledIcon: <HiUsers className="icon-spaced" />,
    },
    {
      text: "Friends",
      outlineIcon: <BsPlus />,
      filledIcon: showFriendRequestBox ? (
        <BsX
          fontSize={24}
          className="icon-with-bg"
          onClick={() => setShowFriendRequestBox(false)}
        />
      ) : (
        <BsPlus
          fontSize={24}
          className="icon-with-bg"
          onClick={() => setShowFriendRequestBox(true)}
        />
      ),
    },
  ];

  const item = items[index];
  if (index === 2)
    return (
      <div className="vertical-left-aligned-container">
        <div
          className={`horizontal-distributed-container ${styles.item} ${
            isSelected ? styles["-selected"] : ""
          }`}
          style={{ cursor: "default", marginBottom: 0 }}
        >
          {`${numberOfFriends} ${item.text}`}
          {item.filledIcon}
        </div>
        <div className={styles["friend-item"]}>
          {showFriendRequestBox ? <FriendRequest /> : null}
        </div>
      </div>
    );

  return (
    <div
      className={`horizontal-left-aligned-container ${styles.item} ${
        isSelected ? styles["-selected"] : ""
      }`}
      onClick={onClick}
    >
      {isSelected ? item.filledIcon : item.outlineIcon}
      {item.text}
    </div>
  );
}

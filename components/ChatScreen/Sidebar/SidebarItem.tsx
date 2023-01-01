import styles from "./style.module.scss";
import { BsChatSquareDots, BsChatSquareDotsFill, BsPlus } from "react-icons/bs";
import { HiUsers, HiOutlineUsers } from "react-icons/hi2";
import { ReactElement } from "react";

interface sidebarItems {
  outlineIcon: ReactElement;
  filledIcon: ReactElement;
  text: string;
}
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
    filledIcon: <BsPlus fontSize={24} className="icon-with-bg" />,
  },
];

export default function SidebarItem({
  index,
  isSelected,
}: {
  index: number;
  isSelected: boolean;
}) {
  const item = items[index];
  if (index === 2)
    return (
      <div
        className={`horizontal-distributed-container ${styles.item} ${
          isSelected ? styles["-selected"] : ""
        }`}
        style={{ cursor: "default" }}
      >
        {item.text}
        {item.filledIcon}
      </div>
    );

  return (
    <div
      className={`horizontal-left-aligned-container ${styles.item} ${
        isSelected ? styles["-selected"] : ""
      }`}
    >
      {isSelected ? item.filledIcon : item.outlineIcon}
      {item.text}
    </div>
  );
}

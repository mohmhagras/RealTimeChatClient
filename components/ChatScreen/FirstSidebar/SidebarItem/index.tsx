import styles from "../../Sidebars.module.scss";
import { BsChatSquareDots, BsChatSquareDotsFill, BsPlus } from "react-icons/bs";
import { HiUsers, HiOutlineUsers } from "react-icons/hi2";
import { MouseEventHandler } from "react";
import { SidebarItem as SidebarItemType } from "../../../../interfaces";

export default function SidebarItem({
  index,
  isSelected,
  onClick,
}: {
  index: number;
  isSelected?: boolean;
  onClick?: MouseEventHandler;
}) {
  const items: Array<SidebarItemType> = [
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
  ];

  const item = items[index];
  return (
    <div
      className={` horizontal-left-aligned-container
           ${styles.item} ${isSelected ? styles["-selected"] : ""}`}
      onClick={onClick}
    >
      {isSelected ? item.filledIcon : item.outlineIcon}
      {item.text}
    </div>
  );
}

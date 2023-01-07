import styles from "../Sidebars.module.scss";
import { BsChatSquareDots, BsChatSquareDotsFill } from "react-icons/bs";
import { HiUsers, HiOutlineUsers } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { SidebarItem } from "../../../interfaces";
import { Dispatch, SetStateAction, useContext } from "react";
import { chatScreenContext } from "../../../Contexts";
export default function Title({ index }: { index: number }) {
  const {
    setDisplayMode,
  }: { setDisplayMode: Dispatch<SetStateAction<number>> } =
    useContext(chatScreenContext);
  const items: Array<SidebarItem> = [
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
      className={`
           horizontal-container
           ${styles.item} ${styles[`colored-bg-item`]}`}
    >
      <IoIosArrowBack
        className="icon-with-bg"
        onClick={() => setDisplayMode(0)}
      />
      <div className="horizontal-centered-container self-centered">
        {item.filledIcon}
        {item.text}
      </div>
    </div>
  );
}

import styles from "./style.module.scss";
import { BsChatSquareDots, BsChatSquareDotsFill, BsPlus } from "react-icons/bs";
import { HiUsers, HiOutlineUsers } from "react-icons/hi2";
import { ReactElement } from "react";
import { MouseEventHandler } from "react";
import { useContext } from "react";
import { chatScreenContext } from "../../../Contexts";
import FriendRequest from "./Friends/FriendRequest";
import { AnimatePresence, motion } from "framer-motion";
interface sidebarItems {
  outlineIcon: ReactElement;
  filledIcon: ReactElement;
  text: string;
}

export default function SidebarItem({
  index,
  isSelected,
  numberOfFriends,
  isTitle,
  onClick,
}: {
  index: number;
  isSelected?: boolean;
  isTitle?: boolean;
  numberOfFriends?: number;
  onClick?: MouseEventHandler;
}) {
  const { showFriendRequestBox, setShowFriendRequestBox } =
    useContext(chatScreenContext);
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
      filledIcon: (
        <div className="icon-with-bg">
          <motion.div
            className="icon-wrapper"
            animate={showFriendRequestBox ? "rotated" : "standard"}
            variants={{
              rotated: {
                rotate: 45,
                translateX: "-50%",
                translateY: "-50%",
                transition: {
                  duration: 0.4,
                },
              },
              standard: {
                rotate: 0,
                translateX: "-50%",
                translateY: "-50%",
                transition: {
                  duration: 0.4,
                },
              },
            }}
          >
            <BsPlus
              fontSize={24}
              onClick={() => setShowFriendRequestBox((prevState) => !prevState)}
            />
          </motion.div>
        </div>
      ),
    },
  ];

  const item = items[index];
  if (index === 2)
    return (
      <div className="vertical-left-aligned-container">
        <div
          className={`horizontal-distributed-container ${styles.item}`}
          style={{ cursor: "default", marginBottom: 0, paddingTop: 20 }}
        >
          {`${numberOfFriends} ${item.text}`}
          {item.filledIcon}
        </div>
        <div className={styles["friend-item"]} style={{ cursor: "default" }}>
          <AnimatePresence>
            {showFriendRequestBox ? (
              <FriendRequest
                setShowFriendRequestBox={setShowFriendRequestBox}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    );

  return (
    <div
      className={`${
        isTitle
          ? `horizontal-centered-container`
          : `horizontal-left-aligned-container`
      } 
           ${styles.item} ${isSelected ? styles["-selected"] : ""} ${
        isTitle ? styles[`colored-bg`] : ``
      }`}
      onClick={onClick}
    >
      {isSelected ? item.filledIcon : item.outlineIcon}
      {item.text}
    </div>
  );
}

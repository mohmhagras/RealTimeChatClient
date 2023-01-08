import styles from "../../Sidebars.module.scss";
import { BsPlus } from "react-icons/bs";
import { useContext } from "react";
import { chatScreenContext } from "../../../../Contexts";
import FriendRequest from "./FriendRequest";
import { AnimatePresence, motion } from "framer-motion";

export default function FriendsTitle({
  numberOfFriends,
}: {
  numberOfFriends?: number;
}) {
  const { showFriendRequestBox, setShowFriendRequestBox } =
    useContext(chatScreenContext);

  return (
    <div className="vertical-left-aligned-container">
      <div
        className={`horizontal-distributed-container ${styles.item}`}
        style={{ cursor: "default", marginBottom: 0, paddingTop: 20 }}
      >
        {`${numberOfFriends} ${numberOfFriends === 1 ? "Friend" : "Friends"}`}
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
              },
            }}
          >
            <BsPlus
              fontSize={24}
              onClick={() => setShowFriendRequestBox((prevState) => !prevState)}
            />
          </motion.div>
        </div>
      </div>
      <div className={styles["friend-item"]} style={{ cursor: "default" }}>
        <AnimatePresence>
          {showFriendRequestBox ? (
            <FriendRequest setShowFriendRequestBox={setShowFriendRequestBox} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import styles from "./style.module.scss";
import { useContext } from "react";
import { chatScreenContext } from "../../../Contexts";
import { Friend } from "../../../interfaces";
import userIcon from "../../../public/images/user-black.png";
export default function Title({ friend }: { friend: Friend }) {
  const { setDisplayMode, setSelectedChat, displayMode } =
    useContext(chatScreenContext);
  return (
    <div
      className={`
           horizontal-container
           ${styles.title} ${
        displayMode
          ? displayMode < 3
            ? styles["two-sidebars-width"]
            : styles["no-sidebar-width"]
          : styles["one-sidebar-width"]
      }`}
    >
      <IoIosArrowBack
        className="icon-with-bg"
        onClick={() => {
          setDisplayMode(1);
          setSelectedChat("");
        }}
      />
      <div className="horizontal-centered-container self-centered">
        <Image
          src={friend.imageUrl === "" ? userIcon : friend.imageUrl}
          width={35}
          height={35}
          alt="logo"
          className="user-image"
        />
        <h3>{friend.username}</h3>
      </div>
    </div>
  );
}

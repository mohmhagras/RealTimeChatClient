import styles from "./style.module.scss";
import Image from "next/image";
import userIcon from "../../public/images/user.png";
import { useContext } from "react";
import { userContext } from "../../Contexts";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdInsertPhoto } from "react-icons/md";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();
  const { user } = useContext(userContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header id={styles.header}>
      <div className="horizontal-centered-container">
        <Image
          src={"https://img.icons8.com/ios/100/FFFFFF/communication--v1.png"}
          width={50}
          height={50}
          alt="logo"
          onClick={() => router.push("/")}
        />
        <h1>Real Time Chat</h1>
      </div>
      <Image
        src={user?.imageUrl || userIcon}
        alt="user icon"
        width={50}
        height={50}
        className="user-image"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />
      {isMenuOpen ? (
        <ul id={styles["user-options-menu"]}>
          <li
            onClick={() => {
              router.push("/changephoto");
              setIsMenuOpen(false);
            }}
          >
            <MdInsertPhoto className="icon" />
            New profile photo
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("token");
              router.reload();
            }}
          >
            <FiLogOut className="icon" />
            Log Out
          </li>
        </ul>
      ) : null}
    </header>
  );
}

import styles from "./style.module.scss";
import Image from "next/image";
import userIcon from "../../public/images/user.png";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
export default function Header() {
  const { user } = useContext(userContext);

  return (
    <header id={styles.header}>
      <div className="horizontal-centered-container">
        <Image
          src={"https://img.icons8.com/ios/100/FFFFFF/communication--v1.png"}
          width={50}
          height={50}
          alt="logo"
        />
        <h1>Real Time Chat</h1>
      </div>
      {/* <button>
        <FiLogIn className="icon" />
        Login
  </button>*/}
      <Image
        src={user?.imageUrl || userIcon}
        alt="user icon"
        width={50}
        height={50}
        className="user-image"
      />
    </header>
  );
}

import { FC } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
export default function Header() {
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
    </header>
  );
}

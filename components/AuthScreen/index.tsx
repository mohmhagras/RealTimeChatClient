import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import Register from "./Register";
import Login from "./Login";
import styles from "./style.module.scss";
export default function AuthScreen() {
  const [mode, setMode] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("hasAccount")) setMode(0);
  }, []);

  return (
    <section
      id={styles.authscreen}
      className="vertical-center-aligned-container"
    >
      <Image
        src={"https://img.icons8.com/ios/250/000000/communication--v1.png"}
        alt="logo"
        width={150}
        height={150}
      />
      <h1>Start chatting now!</h1>

      {mode ? <Register /> : <Login />}
      {mode ? (
        <p onClick={() => setMode(0)}>Login instead</p>
      ) : (
        <p onClick={() => setMode(1)}> Register instead</p>
      )}
    </section>
  );
}

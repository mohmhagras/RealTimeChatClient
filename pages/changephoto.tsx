import { FormEvent, useContext, useRef } from "react";
import { userContext } from "../Contexts";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/changephoto.module.scss";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FiUploadCloud } from "react-icons/fi";
export default function ChangePhoto() {
  const router = useRouter();
  const profilePicRef = useRef<HTMLInputElement>(null);
  const { isSignedIn, user, token } = useContext(userContext);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const storageRef = ref(storage, `users/${user?.username}`);
    await uploadBytes(storageRef, profilePicRef.current.files[0]);
    const imgURL = await getDownloadURL(storageRef);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/User/setimage`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: `"${imgURL}"`,
      }
    );

    if (response.status >= 400) {
      alert(response.statusText);
      return;
    }
    await response.json();
    router.push("/");
  };

  if (isSignedIn)
    return (
      <>
        <Head>
          <title>Change your photo - Real Time Chat</title>
          <meta name="description" content="Chat now with your friends!" />
          <meta
            name="keywords"
            content="Chat, Real time, Messages, friends, friend requests, whatsapp, messenger"
          />
          <meta name="author" content="Mohamed Hagras" />
          <meta name="github" content="https://github.com/mohagras903" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="vertical-center-aligned-container withPadding">
          <form className={styles["form"]} onSubmit={handleFormSubmit}>
            <div className="vertical-left-aligned-container">
              <label>New Profile picture</label>
              <input type="file" ref={profilePicRef} />
            </div>
            <button type="submit">
              <FiUploadCloud className="icon" />
              Upload
            </button>
          </form>
        </main>
      </>
    );

  return (
    <>
      <Head>
        <title>Change your photo - Real Time Chat</title>
        <meta name="description" content="Chat now with your friends!" />
        <meta
          name="keywords"
          content="Chat, Real time, Messages, friends, friend requests, whatsapp, messenger"
        />
        <meta name="author" content="Mohamed Hagras" />
        <meta name="github" content="https://github.com/mohagras903" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="vertical-center-aligned-container withPadding">
        <h1>This page is for signed in users only.</h1>
      </main>
    </>
  );
}

import { FormEvent, useContext, useRef } from "react";
import { userContext } from "../Contexts";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import styles from "../styles/changephoto.module.scss";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FiUploadCloud } from "react-icons/fi";
import { RequestState } from "../interfaces";
import SubmitBox from "../components/SubmitBox";
export default function ChangePhoto() {
  const router = useRouter();
  const profilePicRef = useRef<HTMLInputElement>(null);
  const { isSignedIn, user, token, getUserInfo } = useContext(userContext);
  const [loadingState, setLoadingState] = useState<RequestState>(
    RequestState.NORMAL
  );
  const [errorText, setErrorText] = useState<string>("");
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoadingState(RequestState.LOADING);
      const storageRef = ref(storage, `users/${user?.username}${Date.now()}`);
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
          body: JSON.stringify({ ImageUrl: imgURL }),
        }
      );

      if (response.status >= 400) {
        setLoadingState(RequestState.FAILED);
        setErrorText(await response.text());
        return;
      }
      await response.json();
      setLoadingState(RequestState.SUCCESS);
      getUserInfo();
      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      console.error(error);
      setLoadingState(RequestState.FAILED);
    }
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
            <SubmitBox
              defaultComponent={
                <>
                  <FiUploadCloud className="icon" />
                  Upload
                </>
              }
              state={loadingState}
              error={errorText}
            />
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

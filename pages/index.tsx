import Head from "next/head";
import { useContext } from "react";
import AuthScreen from "../components/AuthScreen";
import ChatScreen from "../components/ChatScreen";
import { userContext } from "../Contexts";
import Header from "../components/Header";
import { ChatScreenContextProvider } from "../Contexts";

export default function Home() {
  const { isSignedIn } = useContext(userContext);
  return (
    <>
      <Head>
        <title>Real Time Chat</title>
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
      {isSignedIn ? <Header /> : null}
      <main className={isSignedIn ? "withPadding" : ""}>
        {isSignedIn ? (
          <ChatScreenContextProvider>
            <ChatScreen />
          </ChatScreenContextProvider>
        ) : (
          <AuthScreen />
        )}
      </main>
    </>
  );
}

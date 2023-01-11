import Head from "next/head";
import { lazy, Suspense, useContext } from "react";
import { userContext } from "../Contexts";
import { AuthStatus } from "../interfaces";

const ChatScreenContextProvider = lazy(() =>
  import("../Contexts").then((module) => {
    return { default: module.ChatScreenContextProvider };
  })
);
const Header = lazy(() => import("../components/Header"));

const ChatScreen = lazy(() => import("../components/ChatScreen"));

const AuthScreen = lazy(() => import("../components/AuthScreen"));

export default function Home() {
  const { signInStatus } = useContext(userContext);

  function renderMainContent() {
    if (signInStatus === AuthStatus.LOADING) {
      return (
        <main>
          <div className="loader page"></div>
        </main>
      );
    } else if (signInStatus === AuthStatus.NOTSIGNEDIN) {
      return (
        <main>
          <Suspense fallback={<div className="loader page"></div>}>
            <AuthScreen />
          </Suspense>
        </main>
      );
    } else if (signInStatus === AuthStatus.SIGNEDIN) {
      return (
        <Suspense fallback={<div className="loader page"></div>}>
          <Header />
          <main className="withPadding">
            <ChatScreenContextProvider>
              <ChatScreen />
            </ChatScreenContextProvider>
          </main>
        </Suspense>
      );
    }
  }
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
      {renderMainContent()}
    </>
  );
}

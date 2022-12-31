import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import localFont from "@next/font/local";

const isLoggedIn = false;
const euclid = localFont({
  src: [
    {
      path: "../public/fonts/Euclid Circular A Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/Euclid Circular A Medium.ttf",
      weight: "600",
      style: "medium",
    },
    {
      path: "../public/fonts/Euclid Circular A Regular.ttf",
      weight: "500",
      style: "regular",
    },
    {
      path: "../public/fonts/Euclid Circular A SemiBold.ttf",
      weight: "700",
      style: "semibold",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        * {
          font-family: ${euclid.style.fontFamily};
        }
      `}</style>
      {isLoggedIn ? <Header /> : ""}
      <Component {...pageProps} />
    </>
  );
}

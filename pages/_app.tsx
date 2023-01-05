import "../styles/globals.scss";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { UserContextProvider } from "../Contexts";

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
    <UserContextProvider>
      <style jsx global>{`
        * {
          font-family: ${euclid.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

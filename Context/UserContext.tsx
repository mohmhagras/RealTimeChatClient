import { createContext, ReactNode, useState, useEffect } from "react";
import { User, Friend } from "../interfaces";
export const userContext = createContext(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

  const getUserInfo = async () => {
    try {
      const response = await fetch("https://localhost:7298/api/User", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUser(await response.json());
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
    if (token.length > 1) {
      localStorage.setItem("token", token);
      setIsSignedIn(true);
      getUserInfo();
    }
  }, [token]);

  return (
    <userContext.Provider value={{ token, setToken, isSignedIn, user }}>
      {children}
    </userContext.Provider>
  );
}

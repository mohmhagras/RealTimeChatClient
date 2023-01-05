import { FormEvent, useRef, useContext, useEffect, useState } from "react";
import { userContext } from "../../../../Contexts";
import { motion } from "framer-motion";
export default function FriendRequest({ setShowFriendRequestBox }) {
  const { token } = useContext(userContext);
  const usernameRef = useRef<HTMLInputElement>();
  const [isFormAccessible, setIsFormAccessibile] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFormAccessibile(true);
    }, 500);
  }, []);
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7298/api/User/sendrequest/${usernameRef.current.value}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 400) {
        alert(await response.text());
        return;
      } else {
        alert("Request Sent!");
        setShowFriendRequestBox(false);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);
  return (
    <motion.form
      key="reqForm"
      onSubmit={handleFormSubmit}
      initial="hidden"
      animate="visible"
      exit="removed"
      style={isFormAccessible ? { zIndex: 0 } : { zIndex: -1 }}
      variants={{
        hidden: {
          opacity: 0,
          y: -50,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
          },
        },
        removed: {
          opacity: 0,
          y: -100,
          zIndex: -1,
          transition: {
            duration: 0.4,
          },
        },
      }}
    >
      <label>Add a friend by typing their username</label>
      <input type="text" required placeholder="john31" ref={usernameRef} />
      <button type="submit">Send Request</button>
    </motion.form>
  );
}

import {
  FormEvent,
  useRef,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { userContext } from "../../../../Contexts";
import { motion } from "framer-motion";
import { RequestState } from "../../../../interfaces";
import ErrorWarning from "../../../Errors";
export default function FriendRequest({
  setShowFriendRequestBox,
}: {
  setShowFriendRequestBox: Dispatch<SetStateAction<boolean>>;
}) {
  const { token } = useContext(userContext);
  const usernameRef = useRef<HTMLInputElement>();
  const [isFormAccessible, setIsFormAccessibile] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<RequestState>(
    RequestState.NORMAL
  );
  const [errorText, setErrorText] = useState<string>("");
  useEffect(() => {
    setTimeout(() => {
      setIsFormAccessibile(true);
    }, 500);
  }, []);
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoadingState(RequestState.LOADING);
    try {
      const response = await fetch(
        `https://localhost:7298/api/User/sendrequest`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: `"${usernameRef?.current?.value}"`,
        }
      );
      if (response.status >= 400) {
        setLoadingState(RequestState.FAILED);
        setErrorText(await response.text());
        setTimeout(() => {
          setLoadingState(RequestState.NORMAL);
        }, 3000);
        return;
      } else {
        setLoadingState(RequestState.SUCCESS);
        setTimeout(() => {
          setLoadingState(RequestState.NORMAL);
          setShowFriendRequestBox(false);
        }, 1000);
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
      <button type="submit">
        {!loadingState ? (
          "Send Request"
        ) : loadingState === 1 ? (
          <>
            <div className="loader"></div>
            Sending...
          </>
        ) : loadingState === 2 ? (
          "Sent!"
        ) : (
          "Failed!"
        )}
      </button>
      {loadingState === 3 ? <ErrorWarning errorText={errorText} /> : null}
    </motion.form>
  );
}

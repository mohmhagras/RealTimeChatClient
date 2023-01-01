import { FormEvent, useRef, useContext } from "react";
import { userContext } from "../../../Context/UserContext";
export default function FriendRequest({ setShowFriendRequestBox }) {
  const { token } = useContext(userContext);
  const usernameRef = useRef<HTMLInputElement>();
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
  return (
    <form onSubmit={handleFormSubmit}>
      <label>Add a friend by typing their username</label>
      <input type="text" required placeholder="john31" ref={usernameRef} />
      <button type="submit">Send Request</button>
    </form>
  );
}

import { FormEvent, useRef, useContext } from "react";
import { userContext } from "../../../Context/UserContext";
export default function FriendRequest() {
  const { token } = useContext(userContext);
  const usernameRef = useRef<HTMLInputElement>(null);
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await fetch("https://localhost:7298/api/User/acceptrequest", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: usernameRef?.current?.value,
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <label>Add a friend by typing their username</label>
      <input type="text" required placeholder="john31" ref={usernameRef} />
      <button type="submit">Send Request</button>
    </form>
  );
}

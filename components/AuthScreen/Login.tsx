import { FiLogIn } from "react-icons/fi";
import React, { useRef } from "react";
export default function Login() {
  const usernamRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = await fetch("https://localhost:7298/api/Auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernamRef?.current?.value,
        password: passwordRef?.current?.value,
      }),
    });

    console.log(token);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="vertical-left-aligned-container">
        <label>
          Username<sup className="required-sup">*</sup>
        </label>
        <input type="text" placeholder="john31" required ref={usernamRef} />
      </div>
      <div className="vertical-left-aligned-container">
        <label>
          Password<sup className="required-sup">*</sup>
        </label>
        <input
          type="password"
          placeholder="••••••••••"
          required
          ref={passwordRef}
        />
      </div>
      <button type="submit">
        <FiLogIn className="icon" />
        Login
      </button>
    </form>
  );
}

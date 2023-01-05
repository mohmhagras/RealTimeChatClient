import { FiLogIn } from "react-icons/fi";
import React, { useRef, useContext } from "react";
import { userContext } from "../../Contexts";

interface LoginResponse {
  token: string;
}

export default function Login() {
  const usernamRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setToken } = useContext(userContext);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7298/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernamRef?.current?.value,
          password: passwordRef?.current?.value,
        }),
      });

      if (response.status === 400) {
        alert(await response.text());
      } else {
        const data: LoginResponse = await response.json();
        setToken(data.token);
      }
    } catch (error) {
      // alert(error);
    }
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

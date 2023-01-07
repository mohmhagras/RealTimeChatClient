import { FiLogIn } from "react-icons/fi";
import React, { useRef, useContext, useState } from "react";
import { userContext } from "../../Contexts";
import { RequestState } from "../../interfaces";
import SubmitBox from "../SubmitBox";
interface LoginResponse {
  token: string;
}

export default function Login() {
  const usernamRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setToken } = useContext(userContext);
  const [loadingState, setLoadingState] = useState<RequestState>(
    RequestState.NORMAL
  );
  const [errorText, setErrorText] = useState<string>("");
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingState(RequestState.LOADING);
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
        setLoadingState(RequestState.FAILED);
        setErrorText(await response.text());
        setTimeout(() => setLoadingState(RequestState.NORMAL), 2000);
      } else {
        setLoadingState(RequestState.SUCCESS);
        const data: LoginResponse = await response.json();
        setToken(data.token);
      }
    } catch (error) {
      alert(error);
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
      <SubmitBox
        state={loadingState}
        error={errorText}
        defaultComponent={
          <>
            <FiLogIn className="icon" />
            Login
          </>
        }
      />
    </form>
  );
}

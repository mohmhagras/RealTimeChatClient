import { FormEvent } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { useRef } from "react";
import { storage } from "../../config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
export default function Register() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (passRef.current.value !== confirmPassRef.current.value) {
      alert("Passwords mismatch!");
      return;
    }
    const storageRef = ref(storage, `users/${usernameRef.current.value}`);
    await uploadBytes(storageRef, profilePicRef.current.files[0]);
    const imgURL = await getDownloadURL(storageRef);

    const response = await fetch("https://localhost:7298/api/Auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef?.current?.value,
        imageUrl: imgURL,
        password: passRef?.current?.value,
      }),
    });

    if (response.status >= 400) {
      alert(response.statusText);
      return;
    }
    await response.json();
    localStorage.setItem("hasAccount", JSON.stringify(true));
    router.reload();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="vertical-left-aligned-container">
        <label>
          Username<sup className="required-sup">*</sup>
        </label>
        <input type="text" placeholder="john31" required ref={usernameRef} />
      </div>
      <div className="vertical-left-aligned-container">
        <label>Profile picture</label>
        <input type="file" ref={profilePicRef} />
      </div>
      <div className="vertical-left-aligned-container">
        <label>
          Password<sup className="required-sup">*</sup>
        </label>
        <input
          type="password"
          placeholder="••••••••••"
          required
          ref={passRef}
        />
      </div>
      <div className="vertical-left-aligned-container">
        <label>
          Confirm Password<sup className="required-sup">*</sup>
        </label>
        <input
          type="password"
          placeholder="••••••••••"
          required
          ref={confirmPassRef}
        />
      </div>
      <button type="submit">
        <IoCreateOutline className="icon" />
        Register
      </button>
    </form>
  );
}

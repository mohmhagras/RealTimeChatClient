import { FormEvent, useContext, useRef } from "react";
import { userContext } from "../Contexts";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/changephoto.module.scss";
import { storage } from "../config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function ChangePhoto() {
  const router = useRouter();
  const profilePicRef = useRef<HTMLInputElement>(null);
  const { isSignedIn, user, token } = useContext(userContext);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const storageRef = ref(storage, `users/${user?.username}`);
    await uploadBytes(storageRef, profilePicRef.current.files[0]);
    const imgURL = await getDownloadURL(storageRef);

    const response = await fetch(`https://localhost:7298/api/User/setimage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: `"${imgURL}"`,
    });

    if (response.status >= 400) {
      alert(response.statusText);
      return;
    }
    await response.json();
    router.push("/");
  };

  useEffect(() => {
    if (!isSignedIn) {
      //router.push("/");
    }
  }, [isSignedIn]);

  return (
    <>
      <Header />
      <main className="vertical-center-aligned-container withPadding">
        <form className={styles["form"]} onSubmit={handleFormSubmit}>
          <div className="vertical-left-aligned-container">
            <label>Profile picture</label>
            <input type="file" ref={profilePicRef} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

import styles from "../style.module.scss";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../Context/UserContext";
import { Friend, User } from "../../../../interfaces";
import Image from "next/image";
import userIcon from "../../../../public/images/user-black.png";
import { useRouter } from "next/router";
export default function RequestsSidebar() {
  const router = useRouter();
  const { token, user } = useContext(userContext);
  const [requests, setRequests] = useState<Array<User>>();
  const countMutualFriends = (friends: Array<Friend>): number => {
    let count = 0;
    console.log(friends);
    friends.forEach(({ username }) => {
      user.friends.forEach((friend) => {
        if (username === friend.username) count++;
      });
    });
    return count;
  };
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        "https://localhost:7298/api/User/friendrequests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRequests(await response.json());
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (acceptedUser: User) => {
    try {
      await fetch(`https://localhost:7298/api/User/acceptrequest`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(acceptedUser),
      });
      setRequests((prevState) =>
        prevState.filter(({ username }) => username !== acceptedUser.username)
      );
      router.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <aside className={styles.sidebar} id={styles["requests-sidebar"]}>
      {requests?.map((request, index) => {
        return (
          <div
            className={`vertical-left-aligned-container ${styles["friend-item"]}`}
            key={index}
            style={{ marginBottom: "16px" }}
          >
            <div
              className={`horizontal-left-aligned-container`}
              key={index}
              style={{ cursor: "default" }}
            >
              <Image
                src={request.imageUrl || userIcon}
                width={40}
                height={40}
                alt="logo"
                className="user-image"
              />
              <div className="vertical-left-aligned-container">
                <h3>{request.username}</h3>
                <p>{` ${
                  countMutualFriends(request.friends) || "No"
                } mutual friends`}</p>
              </div>
            </div>
            <div className={`horizontal-right-aligned-container`}>
              <button id={styles.accept} onClick={() => acceptRequest(request)}>
                Accept
              </button>
              <button id={styles.ignore}>Ignore</button>
            </div>
          </div>
        );
      })}
      {!requests?.length ? <h3>No friend requests at the moment.</h3> : null}
    </aside>
  );
}

import styles from "../style.module.scss";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../Context/UserContext";
import { Friend, User } from "../../../../interfaces";
import Image from "next/image";
export default function RequestsSidebar() {
  const { token, user } = useContext(userContext);
  const [requests, setRequests] = useState<Array<User>>();

  const countMutualFriends = (friends: Array<Friend>): number => {
    let count = 0;
    friends.forEach((friend) => {
      if (user.friends.includes(friend)) count++;
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
      await fetch(
        `https://localhost:7298/api/User/acceptrequest/${user.imageUrl}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(acceptedUser),
        }
      );
      setRequests((prevState) =>
        prevState.filter(({ username }) => {
          username !== acceptedUser.username;
        })
      );
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
          >
            <div
              className={`horizontal-left-aligned-container`}
              key={index}
              style={{ cursor: "default" }}
            >
              <Image
                src={request.imageUrl}
                width={40}
                height={40}
                alt="logo"
                className="user-image"
              />
              <div className="vertical-left-aligned-container">
                <h3>{request.username}</h3>
                <p>{` ${
                  countMutualFriends(request.friends) || "No"
                } mutual Friends`}</p>
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
    </aside>
  );
}

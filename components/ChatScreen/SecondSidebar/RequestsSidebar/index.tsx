import styles from "../../Sidebars.module.scss";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../Contexts";
import { Friend, User } from "../../../../interfaces";
import Image from "next/image";
import userIcon from "../../../../public/images/user-black.png";
import { useRouter } from "next/router";
import Title from "../Title";
import { RequestState } from "../../../../interfaces";
const viewport = require("viewport-dimensions");

export default function RequestsSidebar() {
  const router = useRouter();
  const screenWidth = viewport.width();
  const { token, user } = useContext(userContext);
  const [requests, setRequests] = useState<Array<User>>([]);
  const [loadingState, setLoadingState] = useState<RequestState>(
    RequestState.NORMAL
  );
  const [isFetchingRequests, setIsFetchingRequests] = useState<boolean>(true);
  const countMutualFriends = (friends: Array<Friend>): number => {
    let count = 0;
    friends.forEach(({ username }) => {
      user?.friends.forEach((friend) => {
        if (username === friend.username) count++;
      });
    });
    return count;
  };
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/User/friendrequests`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRequests(await response.json());
      setIsFetchingRequests(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (acceptedUser: User) => {
    setLoadingState(RequestState.LOADING);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/User/acceptrequest`,
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
        prevState.filter(({ username }) => username !== acceptedUser.username)
      );
      router.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <aside className={styles.sidebar} id={styles["requests-sidebar"]}>
      {screenWidth < 670 ? <Title index={1} /> : null}
      {requests?.map((request, index) => {
        return (
          <div
            className={`vertical-left-aligned-container ${styles["request-item"]}`}
            key={index}
          >
            <div className={`horizontal-left-aligned-container`} key={index}>
              <Image
                src={request.imageUrl === "" ? userIcon : request.imageUrl}
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
                {!loadingState ? (
                  "Accept"
                ) : (
                  <div className="loader black"></div>
                )}
              </button>
              <button id={styles.ignore}>Ignore</button>
            </div>
          </div>
        );
      })}
      {isFetchingRequests ? (
        <div className="loader page"></div>
      ) : !requests?.length ? (
        <h3 className={styles["request-item"]}>
          No friend requests at the moment.
        </h3>
      ) : null}
    </aside>
  );
}

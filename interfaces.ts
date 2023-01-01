export interface Friend {
  username: string;
  imageUrl: string;
}

export interface User {
  username: string;
  imageUrl: string;
  friends: Array<Friend>;
}

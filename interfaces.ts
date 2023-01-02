export interface Friend {
  username: string;
  imageUrl: string;
}

export interface User {
  username: string;
  imageUrl: string;
  friends: Array<Friend>;
}

export enum Status {
  SENT,
  DELIVERED,
  READ,
}

export interface Message {
  fromUser: string;
  text: string;
  sentAt: Date;
  status: Status;
}

export interface Chat {
  id?: string;
  usernames: Array<string>;
  messages: Array<Message>;
}

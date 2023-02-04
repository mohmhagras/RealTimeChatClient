import { ReactElement } from "react";
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

type Usernames = [user1: string, user2: string];

export interface Chat {
  id?: string;
  usernames: Usernames;
  messages: Array<Message>;
}

export interface SidebarItem {
  outlineIcon: ReactElement;
  filledIcon: ReactElement;
  text: string;
}

export enum RequestState {
  NORMAL,
  LOADING,
  SUCCESS,
  FAILED,
}

export enum AuthStatus {
  LOADING,
  SIGNEDIN,
  NOTSIGNEDIN,
}

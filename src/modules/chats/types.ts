
export interface IChatListSearch {
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface IChatListCard {
  avatarUrl?: string;
  username?: string;
  firstName: string;
  lastName: string;
}

export interface IMessagesListCard {
  avatarUrl?: string;
  username?: string;
  firstName: string;
  lastName: string;
}

export interface IMessageCard {
  user?: IUser;
  message: string;
  time: string;
}

export interface IUser {
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isOnline: boolean;
}
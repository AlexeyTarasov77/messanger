
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
  user: IUsers;
  message: string;
  time: string;
}

export interface IUsers {
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isOnline: boolean;
}
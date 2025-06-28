import { MediaImage } from "../main/types";
import { IUser, IUserProfile } from "../users/types";

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



export interface ChatGroup {
  id: number;
  name: string;
  is_personal_chat: boolean;
  admin_id: number;
  avatar: string | null;
}

export interface PersonalChatWithLastMsg extends ChatGroupWithLastMsg {
  withUser: IUser
}


export interface ChatMessage {
  id: number;
  content: string;
  author_id: number;
  chat_group_id: number;
  sent_at: string;
  attached_image: string | null;
}

export interface ChatGroupWithLastMsg extends ChatGroup {
  lastMessage?: ChatMessageWithAuthor
}

// Interfaces with relations
export interface ChatGroupWithRelations extends ChatGroup {
  admin: IUser;
  members: IUser[];
  messages: ChatMessageWithRelations[];
}

export interface PersonalChatWithRelations extends ChatGroupWithMessages {
  partner: IUser
}

export interface ChatGroupWithMembers extends ChatGroup {
  members: IUser[];
}

export interface ChatGroupWithMessages extends ChatGroup {
  messages: ChatMessage[];
}


export interface ChatMessageWithRelations extends ChatMessage {
  author: IUser;
  chat_group: ChatGroup;
}

export interface ChatMessageWithAuthor extends ChatMessage {
  author: IUser;
}


export interface CreateGroupStep1Data {
  selectedMembers: IUser[];
}

export interface CreateGroupStep2Data extends CreateGroupStep1Data {
  name: string;
  avatar: string;
}

import { MediaImage } from "../main/types";
import { IUserAvatar } from "../users/types";

export interface IPostTag {
  id: number;
  name: string;
}

export type PostMediaType = "image" | "video"

export type PostMedia = {
  type: PostMediaType;
  url: string;
}

export interface ICreatePostForm {
  links: { id: number, value: string }[]
  title: string;
  subject: string;
  tags: IPostTag[];
  content: string;
  images: string[];
}

export interface IPost {
  id: number;
  title: string;
  tags?: { tag: IPostTag }[];
  content: string;
  images: MediaImage[];
  _count: {
    likes: number;
    views: number;
  };
}

interface IPostAuthor {
  user: {
    id: number;
    username?: string;
    email: string;
    first_name?: string;
    last_name?: string;
    isOnline: boolean;
  }
  signature?: string;
  avatars: IUserAvatar[]
}

export interface IPostWithAuthor extends IPost {
  author: IPostAuthor;
}

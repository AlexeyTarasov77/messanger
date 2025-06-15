import { Media } from "../main/types";

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
  link?: string;
  title: string;
  subject: string;
  tags: IPostTag[];
  body: string;
  media: Omit<Media, "id">[];
}

export interface IPost {
  id: number;
  link?: string;
  title: string;
  subject: string;
  tags?: IPostTag[];
  body: string;
  media: Media[];
  _count: {
    likedBy: number;
    viewedBy: number;
  };
}

interface IPostAuthor {
  id: string;
  username?: string;
  signatureUrl?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isOnline: boolean;
  avatarUrl?: string;
}

export interface IPostWithAuthor extends IPost {
  author: IPostAuthor;
}

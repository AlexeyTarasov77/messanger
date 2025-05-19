export interface IPostTag {
  id: number;
  name: string;
}

export interface ICreatePostForm {
  id: number;
  link?: string;
  title: string;
  subject: string;
  tags?: IPostTag[];
  body: string;
  media: {
    type: string;
    url: string;
  }[];
}

export interface IPost {
  id: number;
  link?: string;
  title: string;
  subject: string;
  tags?: IPostTag[];
  body: string;
  media: {
    id: number;
    type: string;
    url: string;
  }[];
  _count: {
    likedBy: number;
    viewedBy: number
  }
}

interface IPostAuthor {
  id: string;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isOnline: boolean;
  avatarUrl?: string;
}

export interface IPostWithAuthor extends IPost {
  author: IPostAuthor;
}

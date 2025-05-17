export interface IPostTag {
  id: number;
  name: string;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: IPostTag[];
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

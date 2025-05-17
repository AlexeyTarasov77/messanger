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

export interface IPostWithAuthor extends IPost {
  author: {
    username: string;
    avatarUrl: string;
    isOnline: boolean;
  };
}

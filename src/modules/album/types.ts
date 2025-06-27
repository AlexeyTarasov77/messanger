export interface IAlbumTag {
  id: number;
  name: string;
}

export type AlbumMediaType = "image" | "video"

export type AlbumMedia = {
  type: AlbumMediaType;
  url: string;
}

export interface ICreateAlbumForm {
  link?: string;
  title: string;
  subject: string;
  tags: IAlbumTag[];
  body: string;
  media: AlbumMedia[];
}

export interface IAlbum {
  id: number;
  link?: string;
  title: string;
  subject: string;
  tags?: IAlbumTag[];
  body: string;
  media: (AlbumMedia & { id: number; })[];
  _count: {
    likedBy: number;
    viewedBy: number
  }
}

export interface IUpdateAlbumForm {
  id: number;
  name: string;
  subject: string;
  year: string;
}

interface IAlbumAuthor {
  id: string;
  username?: string;
  signatureUrl?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isOnline: boolean;
  avatarUrl?: string;
}

export interface IAlbumWithAuthor extends IAlbum {
  author: IAlbumAuthor;
}

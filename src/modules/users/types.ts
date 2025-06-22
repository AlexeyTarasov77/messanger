import { MediaImage } from "../main/types";
import { IPost } from "../posts/types";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IProfileCardForm {
  avatarUrl?: string;
  username?: string;
}

export interface IUserAvatar {
  id: string;
  shown: boolean;
  active: boolean;
  image: string;
}

export interface IPersonalInfoForm {
  first_name?: string;
  last_name?: string;
  email?: string;
  date_of_birth?: string;
}

export interface IUser {
  id: number;
  username?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  isOnline: boolean;
  date_joined: string;
  profile: {
    date_of_birth: string;
    avatars: IUserAvatar[]
  }
}

export interface IAlbum {
  id: number;
  name: string;
  topic: { id: number, name: string };
  created_at: string;
  images: { image: MediaImage }[];
  preview_image?: string;
  shown: boolean;
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
  author: IAlbumAuthor
}

export interface IUserExtended extends IUser {
  profile: {
    posts: IPost[]
    date_of_birth: string;
    albums: IAlbum[];
    avatars: IUserAvatar[]
  }
}

export interface IUserProfile extends IUserExtended {
  friendsCount: number
}

export interface IRegisterResponse {
  token: string;
  user: IUser;
}

export interface IRegisterStepOne extends ILoginForm {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IRegisterStepTwo {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

export interface IRegisterStepThree {
  firstName: string;
  lastName: string;
  username: string;
}

export interface IRegisterForm extends IRegisterStepOne {
  otp: string;
}

export interface ILoginResponse {
  token: string;
  user: IUserExtended;
}

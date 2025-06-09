import { Media } from "../main/types";
import { IPost } from "../posts/types";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IProfileCardForm {
  avatarUrl?: string;
  username?: string;
}

export interface IPersonalInfoForm {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
}

export interface IUser {
  id: string;
  username?: string;
  email: string;
  aboutMe?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  isOnline: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  blockedById?: number;
}

export interface IAlbum {
  id: string;
  name: string;
  subject: string;
  year: number
  photos: Media[]
}

export interface IUserExtended extends IUser {
  createdPosts: IPost[];
  viewedPosts: IPost[];
  likedPosts: IPost[];
  albums: IAlbum[];
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

import { IPost } from "../posts/types";
import { IAlbum } from "../album/types";

export interface ILoginForm {
    email: string;
    password: string;
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
}

export interface IUserExtended extends IUser {
    createdPosts: IPost[];
    viewedPosts: IPost[];
    updatedAlbum: IAlbum[];
    likedPosts: IPost[];
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

export interface IRegisterForm extends IRegisterStepOne {
    otp: string;
}

export interface ILoginResponse {
    token: string;
    user: IUserExtended;
};

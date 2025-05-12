export interface ILoginForm {
    email: string;
    password: string;
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
    password:string;
    createdAt: string;
    updatedAt: string;
}

export interface IRegisterResponse {
    token: string;
    user: IUser;
}

export interface IRegisterStepOne extends ILoginForm {
    email: string;
    password: string;
    confirmPassword: string;
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

export type LoginResponse = {
    token: string;
    user: IUser;
};

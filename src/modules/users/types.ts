export interface ILoginForm {
    email: string;
    password: string;
}

export interface IUser {
    id: string;
    firstName?: string;
    lastName?: string;
    username: string;
    email: string
    phoneNumber: string;
    isOnline: boolean;
    aboutMe?: string;
    avatarUrl?: string;
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
    otp: string;
}

export interface IRegisterForm extends IRegisterStepOne, IRegisterStepTwo { }

export type LoginResponse = {
    token: string;
    user: IUser;
};

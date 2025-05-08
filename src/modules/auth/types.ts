export interface ILogin {
    email: string;
    password: string;
}

export interface IRegisterStepOne {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterStepTwo {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}

export type LoginResponse = {
    token: string;
    user: ILogin;
};

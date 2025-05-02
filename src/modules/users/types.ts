export interface ILoginForm {
    email: string;
    password: string;
}

export interface IRegisterForm {
    email: string;
    username: string;
    password: string;
    confirmPassword: string
}

export interface IUser {
    username: string;
    email: string
}

export interface IRegisterResponse {
    token: string;
    user: IUser;
}

export interface ILoginResponse {
    token: string;
};

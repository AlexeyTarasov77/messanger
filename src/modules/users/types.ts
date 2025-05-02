export interface ILoginForm {
    email: string;
    password: string;
}

export interface IRegisterForm extends ILoginForm {
    username: string;
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


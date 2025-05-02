export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    username: string;
    password: string;
    confirmPassword:string
}

export type LoginResponse = {
    token: string;
    user: ILogin;
};

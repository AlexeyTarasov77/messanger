import { createContext, useContext } from "react";
import {
    ICreateAlbumForm,
    ILoginForm,
    IRegisterForm,
    IUser,
    IUserExtended,
} from "../../types";
import { ICreatePostForm } from "../../../posts/types";

interface IUserCtx {
    user: IUserExtended | null;
    isLoading: boolean;
    login: (data: ILoginForm) => Promise<string | void>;
    register: (data: IRegisterForm) => Promise<string | void>;
    logout: () => void;
    addPost: (data: ICreatePostForm) => Promise<string | void>;
    updatePost: (
        data: Partial<ICreatePostForm>,
        postId: number
    ) => Promise<string | void>;
    updateUserData: (updatedData: Partial<IUser>) => void;
    removePost: (postId: number) => Promise<string | void>;
    addAlbum: (data: ICreateAlbumForm) => Promise<string | void>;
}

export const UserCtx = createContext<IUserCtx | null>(null);

export function useUserCtx(): IUserCtx {
    const ctx = useContext(UserCtx);
    if (!ctx) throw new Error("ctx not provided");
    return ctx;
}

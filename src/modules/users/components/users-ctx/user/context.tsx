import { createContext, useContext } from "react";
import { ICreateAlbumForm, IUser, IUserExtended } from "../../../types";
import { ICreatePostForm } from "../../../../posts/types";

interface IUserCtx {
    user: IUserExtended | null;
    isLoading: boolean;
    addPost: (data: ICreatePostForm) => Promise<string | void>;
    updatePost: (
        data: Partial<ICreatePostForm>,
        postId: number
    ) => Promise<string | void>;
    updateUserData: (updatedData: Partial<IUser>) => void;
    removePost: (postId: number) => Promise<string | void>;
    addAlbum: (data: ICreateAlbumForm) => Promise<string | void>;
    updateAlbum: (
        data: Partial<ICreateAlbumForm>,
        albumId: number
    ) => Promise<string | void>;
    removeAlbum: (albumId: number) => Promise<string | void>;
}

export const UserCtx = createContext<IUserCtx | null>(null);

export function useUserCtx(): IUserCtx {
    const ctx = useContext(UserCtx);
    if (!ctx) throw new Error("ctx not provided");
    return ctx;
}

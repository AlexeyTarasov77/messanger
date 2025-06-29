import { ReactNode, useEffect, useState } from "react";
import {
    IAlbum,
    IAlbumTopic,
    ICreateAlbumForm,
    ILoginForm,
    IRegisterForm,
    IUser,
    IUserExtended,
} from "../../../types";
import { authService, usersService } from "../../../services";
import { ICreatePostForm, IPost } from "../../../../posts/types";
import { postsService } from "../../../../posts/services";
import { getErrorMessage } from "../../../../../shared/utils/errors";
import { CreateAlbumPayload, UserCtx } from "./context";
import { albumsService } from "../../../services/albums";

export function UsersProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUserExtended | null>(null);
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const user = await usersService.getUser();
                setUser(user);
            } catch (err) {
                console.log("Не удалось получить пользователя:", err);
                throw err;
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const updatePost = async (
        data: Partial<ICreatePostForm>,
        postId: number
    ): Promise<string | void> => {
        if (!user) {
            return "Unauthorized";
        }
        try {
            setIsLoading(true);
            const updatedPost = await postsService.updatePost(data, postId);
            const oldPost = user.profile.posts.find(
                (post) => post.id === postId
            )!;
            const newPost: IPost = {
                ...oldPost,
                ...updatedPost,
            };
            setUser({
                ...user,
                profile: {
                    ...user.profile,
                    posts: [
                        newPost,
                        ...user.profile.posts.filter(
                            (post) => post.id !== oldPost.id
                        ),
                    ],
                },
            });
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addPost = async (data: ICreatePostForm): Promise<string | void> => {
        if (!user) {
            return "Unauthorized";
        }
        try {
            setIsLoading(true);
            const postPartial = await postsService.createPost(data);
            const post: IPost = {
                ...data,
                ...postPartial,
                _count: { likes: 0, views: 0 },
            };
            setUser({
                ...user,
                profile: {
                    ...user.profile,
                    posts: [post, ...user.profile.posts],
                },
            });
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false);
        }
    };

    const removePost = async (postId: number) => {
        if (!user) {
            return "Unauthorized";
        }
        try {
            setIsLoading(true);
            await postsService.deletePost(postId);
            setUser({
                ...user,
                profile: {
                    ...user.profile,
                    posts: user.profile.posts.filter(
                        (post) => post.id !== postId
                    ),
                },
            });
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addAlbum = async (data: CreateAlbumPayload): Promise<string | void> => {
        if (!user) {
            return "Unauthorized";
        }
        try {
            setIsLoading(true);
            const albumPartial = await albumsService.createAlbum({ name: data.name, topic_id: data.topic.id.toString() });
            const album: IAlbum = {
                ...data,
                ...albumPartial,
            };
            console.log("NEW ALBUM IN CONTEXT", album)
            setUser({
                ...user,
                profile: {
                    ...user.profile,
                    albums: [album, ...user.profile.albums],
                },
            });
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateAlbum = async (
        data: Partial<CreateAlbumPayload>,
        albumId: number
    ): Promise<string | void> => {
        if (!user) {
            return "Unauthorized";
        }
        try {
            setIsLoading(true);
            const updatedAlbum = await albumsService.updateAlbum(data, albumId);
            const oldAlbum = user.profile.albums.find(
                (album) => album.id === albumId
            )!;
            const newAlbum: IAlbum = {
                ...oldAlbum,
                ...updatedAlbum,
            };
            if (data.topic) {
                newAlbum.topic = data.topic
            }
            newAlbum.updated_at = new Date().getTime().toString()
            setUser({
                ...user,
                profile: {
                    ...user.profile,
                    albums: [
                        newAlbum,
                        ...user.profile.albums.filter(
                            (album) => album.id !== oldAlbum.id
                        ),
                    ],
                },
            });
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false);
        }
    };

    const removeAlbum = async (albumId: number) => {
        if (!user) {
            return "Unauthorized";
        }
        try {
            setIsLoading(true);
            await albumsService.deleteAlbum(albumId);
            setUser({
                ...user,
                profile: {
                    ...user.profile,
                    albums: user.profile.albums.filter(
                        (album) => album.id !== albumId
                    ),
                },
            });
        } catch (err) {
            return getErrorMessage(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserData = (updatedData: Partial<IUser>) => {
        if (!user) throw new Error("Not authenticated");
        setUser({
            ...user,
            ...updatedData,
            profile: { ...user.profile, ...updatedData.profile },
        });
    };
    return (
        <UserCtx.Provider
            value={{
                user,
                isLoading,
                addPost,
                updatePost,
                removePost,
                addAlbum,
                updateAlbum,
                removeAlbum,
                updateUserData,
            }}
        >
            {children}
        </UserCtx.Provider>
    );
}

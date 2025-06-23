import { ReactNode, useEffect, useState } from "react";
import {
  ILoginForm,
  IRegisterForm,
  IUser,
  IUserExtended,
} from "../../types";
import { authService, usersService } from "../../services";
import { ICreatePostForm, IPost } from "../../../posts/types";
import { postsService } from "../../../posts/services";
import { getErrorMessage } from "../../../../shared/utils/errors";
import { UserCtx } from "./context";

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
        tags: data.tags.map(tag => ({ tag })),
        _count: { likes: 0, views: 0 },
      };
      setUser({ ...user, profile: { ...user.profile, posts: [post, ...user.profile.posts] } });
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
        profile: { ...user.profile, posts: user.profile.posts.filter((post) => post.id !== postId) }
      });
    } catch (err) {
      return getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: ILoginForm) => {
    try {
      setIsLoading(true);
      const token = await authService.login(data);
      setToken(token);
    } catch (err) {
      return getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: IRegisterForm) => {
    try {
      setIsLoading(true);
      const resp = await authService.register(data);
      setToken(resp.token);
    } catch (err) {
      return getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logOut();
    setUser(null);
  };

  const updateUserData = (updatedData: Partial<IUser>) => {
    if (!user) throw new Error("Not authenticated");
    setUser({ ...user, ...updatedData, profile: { ...user.profile, ...updatedData.profile } });
  };
  return (
    <UserCtx.Provider
      value={{
        user,
        login,
        register,
        isLoading,
        logout,
        addPost,
        removePost,
        updateUserData,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
}

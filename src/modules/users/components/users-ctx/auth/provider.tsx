import { ReactNode, useEffect, useState } from "react";
import {
  ILoginForm,
  IRegisterForm,
} from "../../../types";
import { authService, usersService } from "../../../services";
import { getErrorMessage } from "../../../../../shared/utils/errors";
import { AuthCtx } from "./context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const f = async () => {
      try {
        setIsLoading(true);
        const isAuthenticated = await usersService.checkAuthenticated();
        setIsAuthenticated(isAuthenticated)
      } catch (err) {
        console.log("Failed to check whether user is authenticated", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    f();
  }, [token]);


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
    setToken("");
  };

  return (
    <AuthCtx.Provider
      value={{
        login,
        register,
        isLoading,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

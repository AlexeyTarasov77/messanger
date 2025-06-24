import {
  createContext,
  useContext,
} from "react";
import {
  ILoginForm,
  IRegisterForm,
} from "../../../types";

interface IAuthCtx {
  isLoading: boolean;
  login: (data: ILoginForm) => Promise<string | void>;
  register: (data: IRegisterForm) => Promise<string | void>;
  logout: () => void;
  isAuthenticated: boolean
}

export const AuthCtx = createContext<IAuthCtx | null>(null);

export function useAuthCtx(): IAuthCtx {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("ctx not provided");
  return ctx;
}


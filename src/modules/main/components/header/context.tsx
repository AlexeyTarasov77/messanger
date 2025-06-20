import { createContext, ReactNode, useContext, useState } from "react";
import { useCreatePostModal } from "../../../posts/components";

export enum HeaderAction {
  SETTINGS,
  CREATE,
  LOGOUT
}
type callbackT = () => void

interface ICreateActionCtx {
  setCreateActionCallback: (callback: callbackT) => void
  createActionCallback: callbackT
}

const CreateActionCtx = createContext<ICreateActionCtx | null>(null)

export function CreateActionProvider({ children }: { children: ReactNode }) {
  const { open: createPostModalOpen } = useCreatePostModal();
  const [createActionCallback, setCreateActionCallback] = useState(() => createPostModalOpen)
  return <CreateActionCtx.Provider value={{ createActionCallback, setCreateActionCallback }}>{children}</CreateActionCtx.Provider>
}


export function useCreateActionCtx(): ICreateActionCtx {
  const ctx = useContext(CreateActionCtx);
  if (!ctx) throw new Error("ctx not provided");
  return ctx;
}


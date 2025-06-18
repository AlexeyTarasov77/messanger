import { createContext, ReactNode, useContext, useState } from "react";
import { useCreatePostModal } from "../../../posts/components";

export enum HeaderAction {
  SETTINGS,
  CREATE,
  LOGOUT
}
type callbackT = () => void

interface IHeaderCtx {
  showedActions: HeaderAction[];
  removeShowedAction: (action: HeaderAction) => void;
  addShowedAction: (action: HeaderAction) => void;
  createActionCallback: callbackT
  setCreateActionCallback: (callback: callbackT) => void
}

const HeaderCtx = createContext<IHeaderCtx | null>(null);

export function useHeaderCtx(): IHeaderCtx {
  const ctx = useContext(HeaderCtx);
  if (!ctx) throw new Error("ctx not provided");
  return ctx;
}

const defaultHeaderActions: HeaderAction[] = Object.values(HeaderAction) as HeaderAction[]

export function HeaderProvider({ children }: { children: ReactNode }) {
  const { open: createPostModalOpen } = useCreatePostModal();
  const [showedActions, setShowedActions] = useState<HeaderAction[]>(defaultHeaderActions)
  const [createActionCallback, setCreateActionCallback] = useState(() => createPostModalOpen)
  const removeShowedAction = (action: HeaderAction) => {
    console.log("ACTION REMOVED", action)
    setShowedActions(showedActions.filter(showedAction => showedAction !== action))
  }
  const addShowedAction = (action: HeaderAction) => {
    console.log("ACTION ADDED", action)
    setShowedActions([...showedActions, action])
  }
  return <HeaderCtx.Provider value={{ showedActions, removeShowedAction, addShowedAction, createActionCallback, setCreateActionCallback }}>{children}</HeaderCtx.Provider>
}

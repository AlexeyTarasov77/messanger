import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IModalContext {
  open: (modal: IModal) => void;
  close: () => void;
  getModal: (name: ModalName) => IModal | undefined
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export enum ModalName {
  CREATE_POST,
  UPDATE_POST,
  CREATE_CHAT_STEP_1,
  CREATE_CHAT_STEP_2,
  UPDATE_CHAT,
  ADD_GROUP_MEMBER,
  CREATE_ALBUM,
  FIRST_LOGIN,
  CONFIRMATION
}

export interface IModal {
  name: ModalName;
  props?: Record<any, any>;
}

export const ModalProvider = ({
  children,
}: PropsWithChildren) => {
  const [modals, setModals] = useState<IModal[]>([])
  return (
    <ModalContext.Provider
      value={{
        getModal: (name: ModalName) => modals.find(el => el.name === name),
        open: (modal: IModal) => setModals(prev => [...prev, modal]),
        close: () => setModals(prev => prev.slice(0, prev.length - 1)),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

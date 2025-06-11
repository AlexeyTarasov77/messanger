import { createContext, useContext, useState } from "react";

const DeleteUserModalContext = createContext<{
  open: (callback?: () => void) => void;
  close: () => void;
  visible: boolean;
  callback: (() => void) | null;
}>({
  open: () => {},
  close: () => {},
  visible: false,
  callback: null,
});

export const DeleteUserModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [callback, setCallback] = useState<(() => void) | null>(null);

  return (
    <DeleteUserModalContext.Provider
      value={{
        visible,
        open: (cb) => {
          setCallback(() => cb);
          setVisible(true);
        },
        close: () => {
          setVisible(false);
          setCallback(null); 
        },
        callback,
      }}
    >
      {children}
    </DeleteUserModalContext.Provider>
  );
};

export const useDeleteUserModal = () => useContext(DeleteUserModalContext);
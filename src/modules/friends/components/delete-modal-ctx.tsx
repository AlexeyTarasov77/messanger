import { createContext, useContext, useState } from "react";

const DeleteUserModalContext = createContext<{
  open: () => void;
  close: () => void;
  visible: boolean;
}>({
  open: () => {},
  close: () => {},
  visible: false,
});

export const DeleteUserModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <DeleteUserModalContext.Provider
      value={{
        visible,
        open: () => setVisible(true),
        close: () => setVisible(false),
      }}
    >
      {children}
    </DeleteUserModalContext.Provider>
  );
};

export const useDeleteUserModal = () => useContext(DeleteUserModalContext);

import { createContext, useContext, useState } from 'react';

const CreateGroupModalContext = createContext<{
  open: () => void;
  close: () => void;
  visible: boolean;
}>({
  open: () => {},
  close: () => {},
  visible: false,
});

export const CreateGroupModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  return (
    <CreateGroupModalContext.Provider
      value={{
        visible,
        open: () => setVisible(true),
        close: () => setVisible(false),
      }}
    >
      {children}
    </CreateGroupModalContext.Provider>
  );
};

export const useCreateGroupModal = () => useContext(CreateGroupModalContext);

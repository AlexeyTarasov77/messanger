import { createContext, useContext, useState } from "react";

const CreatePostModalContext = createContext<{
  open: () => void;
  close: () => void;
  visible: boolean;
}>({
  open: () => {},
  close: () => {},
  visible: false,
});

export const CreatePostModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <CreatePostModalContext.Provider
      value={{
        visible,
        open: () => setVisible(true),
        close: () => setVisible(false),
      }}
    >
      {children}
    </CreatePostModalContext.Provider>
  );
};

export const useCreatePostModal = () => useContext(CreatePostModalContext);

import { createContext, useContext, useState } from 'react';

const UpdateAlbumModalContext = createContext<{
  open: () => void;
  close: () => void;
  visible: boolean;
}>({
  open: () => { },
  close: () => { },
  visible: false,
});

export const UpdateAlbumModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  return (
    <UpdateAlbumModalContext.Provider
      value={{
        visible,
        open: () => setVisible(true),
        close: () => setVisible(false),
      }}
    >
      {children}
    </UpdateAlbumModalContext.Provider>
  );
};

export const useUpdateAlbumModal = () => useContext(UpdateAlbumModalContext);

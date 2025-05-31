import { createContext, useContext, useState } from "react";


const RegisterModalContext = createContext<{
    open: () => void;
    close: () => void;
    visible: boolean;
}>({
    open: () => {},
    close: () => {},
    visible: false,
});

export const RegisterModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <RegisterModalContext.Provider
            value={{
                visible,
                open: () => setVisible(true),
                close: () => setVisible(false),
            }}
        >
            {children}
        </RegisterModalContext.Provider>
    );
};

export const useRegisterModal = () => useContext(RegisterModalContext);

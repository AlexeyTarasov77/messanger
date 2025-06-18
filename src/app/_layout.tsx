import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import { RootLayout } from "../modules/main/screens/layouts/root-layout";
import { UsersProvider } from "../modules/users/components/users-ctx/context";
import { CreatePostModalProvider } from "../modules/posts/components";
import { RegisterModalProvider } from "../modules/users/components/modal-ctx";

import { DeleteUserModalProvider } from "../modules/friends/components/delete-modal-ctx";
import { HeaderProvider } from "../modules/main/components/header";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <UsersProvider>
                <CreatePostModalProvider>
                    <DeleteUserModalProvider>
                        <RegisterModalProvider>
                            <HeaderProvider>
                                <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                                    <RootLayout />
                                </SafeAreaView>
                            </HeaderProvider>
                        </RegisterModalProvider>
                    </DeleteUserModalProvider>
                </CreatePostModalProvider>
            </UsersProvider>
        </SafeAreaProvider>
    );
}

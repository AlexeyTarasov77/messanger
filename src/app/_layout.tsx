import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import { RootLayout } from "../modules/main/screens/layouts/root-layout";
import { UsersProvider } from "../modules/users/components/users-ctx/context";
import { CreatePostModalProvider } from "../modules/posts/components";
import { RegisterModalProvider } from "../modules/users/components/modal-ctx";

export default function Layout() {
    return (
        <SafeAreaProvider >
            <UsersProvider>
                <CreatePostModalProvider>
                    <RegisterModalProvider>
                        <SafeAreaView style={{ flex: 1 }}>
                            <RootLayout />
                        </SafeAreaView>
                    </RegisterModalProvider>
                </CreatePostModalProvider>
            </UsersProvider>
        </SafeAreaProvider>
    );
}

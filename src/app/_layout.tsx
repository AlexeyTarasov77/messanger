import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import { RootLayout } from "../modules/main/screens/layouts/root";
import {
    AuthProvider,
    UsersProvider,
} from "../modules/users/components/users-ctx";
import { ModalProvider } from "../shared/context/modal";
import { SocketProvider } from "../modules/users/components/users-ctx";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <ModalProvider>
                <AuthProvider>
                    <UsersProvider>
                        <SocketProvider>
                            <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                                <RootLayout />
                            </SafeAreaView>
                        </SocketProvider>
                    </UsersProvider>
                </AuthProvider>
            </ModalProvider>
        </SafeAreaProvider>
    );
}

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import { RootLayout } from "../modules/main/screens/layouts/root";
import { AuthProvider, UsersProvider } from "../modules/users/components/users-ctx";
import { ModalProvider } from "../shared/context/modal";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <ModalProvider><AuthProvider><UsersProvider>
                <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                    <RootLayout />
                </SafeAreaView>
            </UsersProvider></AuthProvider></ModalProvider>
        </SafeAreaProvider>
    );
}

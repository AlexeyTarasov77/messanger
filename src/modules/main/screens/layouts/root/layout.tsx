import { Header } from "../../../components";
import { Stack } from "expo-router";
import { RedirectUnauthenticated } from "../../../components/redirect-unauthenticated";
import { useSetup } from "./setup";
import { ModalRoot } from "./modal";

export function RootLayout() {
    useSetup();
    return (
        <RedirectUnauthenticated>
            <Stack screenOptions={{ header: Header }} />
            <ModalRoot />
        </RedirectUnauthenticated>
    );
}

import { Stack } from "expo-router";
import { Links } from "../../../modules/chats/components/links-bar";

export default function ChatsLayout() {
    return (
        <>
            <Links />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </>
    );
}

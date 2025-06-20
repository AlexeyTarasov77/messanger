import { Stack } from "expo-router";
import { NavBar } from "../../../modules/chats/components/navbar";

export default function ChatsLayout() {
    return (
        <>
            <NavBar />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </>
    );
}

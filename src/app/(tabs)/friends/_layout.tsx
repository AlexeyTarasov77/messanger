import { Stack } from "expo-router";
import { Links } from "../../../modules/friends/components/links";

export default function FriendsLayout() {
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

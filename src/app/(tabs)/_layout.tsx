import { Tabs } from "expo-router";
import { ICONS } from "../../shared/ui/icons";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Головна",
                    tabBarLabelStyle: {
                        color: "black",
                        fontWeight: "bold",
                    },
                    tabBarIcon: ({ size }) => (
                        <ICONS.HomeIcon width={size} height={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="my-posts"
                options={{
                    title: "Мої публікації",
                    tabBarLabelStyle: {
                        color: "black",
                        fontWeight: "bold",
                    },
                    tabBarIcon: ({ size }) => (
                        <ICONS.PostsIcon width={size} height={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="contacts"
                options={{
                    title: "Друзі",
                    tabBarLabelStyle: {
                        color: "black",
                        fontWeight: "bold",
                    },
                    tabBarIcon: ({ size }) => (
                        <ICONS.FriendsIcon width={size} height={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: "Чати",
                    tabBarLabelStyle: {
                        color: "black",
                        fontWeight: "bold",
                    },
                    tabBarIcon: ({ size }) => (
                        <ICONS.ChatsIcon width={size} height={size} />
                    ),
                }}
            />
        </Tabs>
    );
}

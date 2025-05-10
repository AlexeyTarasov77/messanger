import { View, Text, TouchableOpacity } from "react-native";
import { LogoIcon } from "../icons/logo-icon";
import { PlusIcon } from "../icons/plus-icon";
import { LogOutIcon } from "../icons/logout-icon";
import { SettingsIcon } from "../icons/settings-icon";
import { Link, Tabs } from "expo-router";
import { authService } from "../../../modules/users/services";

export function MainHeader() {
    return (
        <View className="flex-row items-center justify-between p-2">
            <View className="justify-start">
                <Link href="/index" asChild>
                    <TouchableOpacity>
                        <LogoIcon />
                    </TouchableOpacity>
                </Link>
            </View>
            <View className="flex-row gap-2">
                <TouchableOpacity className=" border-text border rounded-full p-2 ">
                    <PlusIcon width={20} height={20} />
                </TouchableOpacity>
                <TouchableOpacity className=" border-text border rounded-full p-2 ">
                    <SettingsIcon width={20} height={20} />
                </TouchableOpacity>
                {/* <Tabs screenOptions={{ headerShown: false }}>
                  <Tabs.Screen
                    name="chats"
                    options={{
                      title: "Chats",
                      // tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />
                    }}
                  />
                  <Tabs.Screen
                    name="contacts"
                    options={{
                      title: "Contacts",
                      // tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />
                    }}
                  />
                </Tabs> */}
                <TouchableOpacity
                    onPress={() => {
                        authService.logOut();
                    }}
                    className="border-text border rounded-full p-2 "
                >
                    <LogOutIcon width={20} height={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

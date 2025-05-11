import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { THEME_STORAGE_KEY } from "../shared/constants";
import "../styles/global.css";
import { Slot } from "expo-router";
import { COLOR_PALETTE } from "../shared/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { PostCard } from "../shared/ui/postCard";
import { PostsList } from "../shared/ui/postsList";
import { CustomHeader } from "../shared/ui/header";

export default function RootLayout() {
    const { setColorScheme } = useColorScheme();
    useEffect(() => {
        const setTheme = async () => {
            const selectedTheme = (await AsyncStorage.getItem(
                THEME_STORAGE_KEY
            )) as ReturnType<typeof useColorScheme>["colorScheme"];
            setColorScheme(selectedTheme || "system");
        };
        setTheme();
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader />
                <PostsList />
                {/* <Stack */}
                {/*   screenOptions={{ */}
                {/*     headerStyle: { */}
                {/*       backgroundColor: '#f4511e', */}
                {/*     }, */}
                {/*     headerTintColor: '#fff', */}
                {/*     headerTitleStyle: { */}
                {/*       fontWeight: 'bold', */}
                {/*     }, */}
                {/*   }}> */}
                {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
                {/* </Stack> */}
                <Slot />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { THEME_STORAGE_KEY } from "../shared/constants";
import "../styles/global.css";
import { Slot } from "expo-router";
import { COLOR_PALETTE } from "../shared/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Posts } from "../shared/ui/postCard";

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

    const { colorScheme } = useColorScheme();
    const colors = colorScheme === "light"
        ? ([
            COLOR_PALETTE.lightTheme.gradientColors.top,
            COLOR_PALETTE.lightTheme.gradientColors.bottom,
        ] as const)
        : ([
            COLOR_PALETTE.darkTheme.gradientColors.top,
            COLOR_PALETTE.darkTheme.gradientColors.bottom,
        ] as const)

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    className="h-full"
                >
                    <Posts />
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
                </LinearGradient>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

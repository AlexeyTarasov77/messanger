import { Header } from "../../components";
import { Stack } from "expo-router";
import { THEME_STORAGE_KEY } from "../../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { UsersProvider } from "../../../users/components/users-ctx/context";
import { useColorScheme } from "nativewind";
import { RedirectUnauthenticated } from "../../components/redirect-unauthenticated";

export function RootLayout() {
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
      <UsersProvider>
        <SafeAreaView className="flex-1">
          <RedirectUnauthenticated>
            {/* <Header /> */}
            {/* <Stack /> */}
            <Stack screenOptions={{ header: Header }} />
          </RedirectUnauthenticated>
        </SafeAreaView>
      </UsersProvider>
    </SafeAreaProvider>
  );
}

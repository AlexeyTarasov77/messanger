import { Header } from "../../components";
import { Stack } from "expo-router";
import { THEME_STORAGE_KEY } from "../../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";
import { RedirectUnauthenticated } from "../../components/redirect-unauthenticated";
import { CreatePostModal } from "../../../posts/screens";
import { CreateGroupModal } from "../../../chats/screens";

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
    <RedirectUnauthenticated>
      {/* <Stack.Screen name="/users/index.tsx" options={{ header: () => <Header /> }} />
      <Stack.Screen name="/users/chats-list" options={{ header: () => <Header.HeaderChats /> }} /> */}

      {/* <Stack screenOptions={{ header: () => <Header /> }} /> */}
      <Stack screenOptions={{ header: () => <Header.HeaderChats /> }} />
      {/* <CreatePostModal  /> */}
      <CreateGroupModal />
    </RedirectUnauthenticated>
  );
}

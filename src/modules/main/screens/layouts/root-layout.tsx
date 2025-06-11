import { Header } from "../../components";
import { Stack } from "expo-router";
import { THEME_STORAGE_KEY } from "../../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";
import { useColorScheme } from "nativewind";
import { RedirectUnauthenticated } from "../../components/redirect-unauthenticated";
import { CreatePostModal } from "../../../posts/screens";
import { RegisterStepThree } from "../../../users/screens";
import { useUserCtx } from "../../../users/components/users-ctx/context";
import { useRegisterModal } from "../../../users/components/modal-ctx";
import { DeleteUserModalProvider } from "../../../friends/components/delete-modal-ctx";
import { DeleteUserModal } from "../../../friends/components";

function RegisterModalCheck() {
  const { user } = useUserCtx();
  const { open } = useRegisterModal();
  const modalShownInSession = useRef(false);

  useEffect(() => {
    if (!user || modalShownInSession.current) return;

    const check = async () => {
      const wasShown = await AsyncStorage.getItem(
        `profile_modal_shown_${user.id}`,
      );
      const missing = !user.firstName || !user.lastName || !user.username;

      if (!wasShown && missing) {
        setTimeout(() => {
          open();
          modalShownInSession.current = true;
        }, 0);
      }
    };

    check();
  }, [user]);

  return null;
}

export function RootLayout() {
  const { setColorScheme } = useColorScheme();
  useEffect(() => {
    const setTheme = async () => {
      const selectedTheme = (await AsyncStorage.getItem(
        THEME_STORAGE_KEY,
      )) as ReturnType<typeof useColorScheme>["colorScheme"];
      setColorScheme(selectedTheme || "system");
    };
    setTheme();
  });

  return (
    <RedirectUnauthenticated>
      <Stack screenOptions={{ header: Header }} />
      <CreatePostModal />
      <RegisterStepThree />
      <RegisterModalCheck />
      <DeleteUserModal/>
    </RedirectUnauthenticated>
  );
}

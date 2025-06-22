import { Header } from "../../components";
import { CreateGroupModal } from "../../../chats/screens";
import { Stack } from "expo-router";
import { THEME_STORAGE_KEY } from "../../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";
import { useColorScheme } from "nativewind";
import { RedirectUnauthenticated } from "../../components/redirect-unauthenticated";
import { CreatePostModal } from "../../../posts/screens";
import { RegisterStepThree } from "../../../users/screens";
import { useUserCtx } from "../../../users/components/users-ctx";
import { useRegisterModal } from "../../../users/components/modal-ctx";
import { DeleteUserModal } from "../../../friends/components";
import { useSetup } from "./setup";

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
      const missing = !user.first_name || !user.last_name || !user.username;

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
  useSetup()
  return (
    <RedirectUnauthenticated>
      <Stack screenOptions={{ header: Header }} />
      <CreatePostModal />
      <RegisterStepThree />
      <RegisterModalCheck />
      <DeleteUserModal />
      <CreateGroupModal />
    </RedirectUnauthenticated>
  );
}

import { CreateGroupModal } from "../../../../chats/screens";
import { useEffect, useRef } from "react";
import { CreatePostModal } from "../../../../posts/screens";
import { RegisterStepThree } from "../../../../users/screens";
import { useUserCtx } from "../../../../users/components/users-ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IModal, ModalName, useModal } from "../../../../../shared/context/modal";
import { ConfirmationModal } from "../../../../../shared/ui/confirmation-modal/modal";
import { UpdatePostModal } from "../../../../posts/screens/update-post";

function RegisterModalCheck() {
  const { user } = useUserCtx();
  const { open } = useModal();
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
          open({ name: ModalName.FIRST_LOGIN });
          modalShownInSession.current = true;
        }, 0);
      }
    };

    check();
  }, [user]);

  return null;
}

export function ModalRoot() {
  const { getModal, close } = useModal()
  const activeModals = Object.fromEntries(
    Object.values(ModalName).map(val => [val, getModal(val as ModalName)])
  )
  const modalsComponents = {
    [ModalName.CREATE_POST]: CreatePostModal,
    [ModalName.FIRST_LOGIN]: RegisterStepThree,
    [ModalName.UPDATE_POST]: UpdatePostModal,
    // [ModalName.CREATE_ALBUM] : CreateAlbumModal,
    [ModalName.CREATE_CHAT]: CreateGroupModal,
    [ModalName.CONFIRMATION]: ConfirmationModal,
  }
  return <>
    <RegisterModalCheck />
    {Object.entries(modalsComponents).map(([name, Component]) =>
      <Component key={name} isVisible={!!activeModals[name]} close={close} {...activeModals[name]?.props} />
    )}
  </>
}

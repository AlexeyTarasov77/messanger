import { Text, View, TouchableOpacity } from "react-native";
import { Link, usePathname, useRouter } from "expo-router";
import { ICONS } from "../../../../shared/ui/icons";
import { LogoIcon, LogOutIcon, PlusIcon, SettingsIcon } from "../../../../shared/ui/icons/headerIcons";
import { LinkItem } from "./link-item";
import { useEffect, useState } from "react";
import { useUserCtx } from "../../../users/components/users-ctx/context";
import { useCreatePostModal } from "../../../posts/components";
import { useCreateGroupModal } from "../../../chats/components";


export enum HeaderAction {
  SETTINGS,
  CREATE,
  LOGOUT
}

export function Header() {
  const router = useRouter();
  const defaultHeaderActions: HeaderAction[] = Object.values(HeaderAction) as HeaderAction[]
  const [showedActions, setShowedActions] = useState<HeaderAction[]>(defaultHeaderActions)
  const { user, logout } = useUserCtx();
  const { open: openPostModal } = useCreatePostModal();
  const { open: openGroupModal } = useCreateGroupModal();
  const [createActionCallback, setCreateActionCallback] = useState(() => openPostModal)
  const currPath = usePathname()
  useEffect(() => {
    const friendPathRegexp = new RegExp("\/friends.*")
    const profilePathRegexp = new RegExp("\/profile.*")
    const chatsPathRegexp = new RegExp("\/chats.*")
    if (friendPathRegexp.test(currPath) || profilePathRegexp.test(currPath)) {
      setShowedActions(showedActions.filter(showedAction => showedAction !== HeaderAction.CREATE))
    } else if (chatsPathRegexp.test(currPath)) {
      setCreateActionCallback(() => openGroupModal)
      setShowedActions(showedActions.filter(showedAction => showedAction !== HeaderAction.SETTINGS))
    } else {
      setShowedActions(defaultHeaderActions)
    }
  }, [currPath])

  const onLogout = () => {
    logout();
    router.navigate("/users/login");
  };
  return (
    <View className="flex-row p-2 gap-[30%] bg-white self-center justify-center w-full">
      <View className="self-center items-center justify-center">
        <Link href="/" asChild>
          <TouchableOpacity>
            <LogoIcon />
          </TouchableOpacity>
        </Link>
      </View>
      {user && (
        <View className="flex-row gap-2 max-w-fit">
          {showedActions.includes(HeaderAction.CREATE) &&
            <LinkItem
              onPress={createActionCallback}
              focused={false}
            >
              <PlusIcon width={20} height={20} />
            </LinkItem>
          }
          ,
          {showedActions.includes(HeaderAction.SETTINGS) &&
            <LinkItem
              path="/settings"
            >
              <SettingsIcon width={20} height={20} />
            </LinkItem>
          }
          ,
          {showedActions.includes(HeaderAction.LOGOUT) &&
            <LinkItem
              onPress={onLogout}
            >
              <LogOutIcon width={20} height={20} />
            </LinkItem>
          }
        </View>
      )}
    </View>
  );
}


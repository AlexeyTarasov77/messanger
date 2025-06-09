import { View, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import {
  LogoIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
} from "../../../../shared/ui/icons/headerIcons";
import { useUserCtx } from "../../../users/components/users-ctx/context";
import { useCreatePostModal } from "../../../posts/components";
import { useRegisterModal } from "../../../users/components/modal-ctx";

export function Header() {
  const router = useRouter();
  const { user, logout } = useUserCtx();
  const { open: createPostModalOpen } = useCreatePostModal();
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
          <TouchableOpacity
            onPress={() => createPostModalOpen()}
            className=" border-text border rounded-full p-2 "
          >
            <PlusIcon width={20} height={20} />
          </TouchableOpacity>
          ,
          <TouchableOpacity className=" border-text border rounded-full p-2 ">
            <SettingsIcon width={20} height={20} />
          </TouchableOpacity>
          ,
          <TouchableOpacity
            onPress={onLogout}
            className="border-text border rounded-full p-2 "
          >
            <LogOutIcon width={20} height={20} />
          </TouchableOpacity>
          ,
        </View>
      )}
    </View>
  );
}

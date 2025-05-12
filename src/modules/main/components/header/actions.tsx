import { TouchableOpacity } from "react-native";
import { LogOutIcon, PlusIcon, SettingsIcon } from "../../../../shared/ui/icons/headerIcons";
import { authService } from "../../../users/services";
import { Router } from "expo-router";

export const getBaseActions = () => [
  <TouchableOpacity className=" border-text border rounded-full p-2 ">
    <PlusIcon width={20} height={20} />
  </TouchableOpacity>,
  <TouchableOpacity className=" border-text border rounded-full p-2 ">
    <SettingsIcon width={20} height={20} />
  </TouchableOpacity>,
]
export const getAuthenticatedOnlyActions = (onLogout: () => void) => [
  <TouchableOpacity
    onPress={onLogout}
    className="border-text border rounded-full p-2 "
  >
    <LogOutIcon width={20} height={20} />
  </TouchableOpacity>
]

import { TouchableOpacity } from "react-native";
import { LogOutIcon, PlusIcon, SettingsIcon } from "../../../../shared/ui/icons/headerIcons";
import { authService } from "../../../users/services";

export const headersBaseActions = [
  <TouchableOpacity className=" border-text border rounded-full p-2 ">
    <PlusIcon width={20} height={20} />
  </TouchableOpacity>,
  <TouchableOpacity className=" border-text border rounded-full p-2 ">
    <SettingsIcon width={20} height={20} />
  </TouchableOpacity>,
]
export const authenticatedOnlyActions = [
  <TouchableOpacity
    onPress={() => { authService.logOut(); }}
    className="border-text border rounded-full p-2 "
  >
    <LogOutIcon width={20} height={20} />
  </TouchableOpacity>
]

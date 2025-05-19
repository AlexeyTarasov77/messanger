import { TouchableOpacity } from "react-native";
import {
    LogOutIcon,
    PlusIcon,
    SettingsIcon,
} from "../../../../shared/ui/icons/headerIcons";
import { authService } from "../../../users/services";
import { Router } from "expo-router";
import { ReactNode } from "react";

export const getBaseActions = ():ReactNode[] => [];
export const getAuthenticatedOnlyActions = (onLogout: () => void) => [
    <TouchableOpacity className=" border-text border rounded-full p-2 ">
        <PlusIcon width={20} height={20} />
    </TouchableOpacity>,
    <TouchableOpacity className=" border-text border rounded-full p-2 ">
        <SettingsIcon width={20} height={20} />
    </TouchableOpacity>,
    <TouchableOpacity
        onPress={onLogout}
        className="border-text border rounded-full p-2 "
    >
        <LogOutIcon width={20} height={20} />
    </TouchableOpacity>,
];

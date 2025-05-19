import { View, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { LogoIcon } from "../../../../shared/ui/icons/headerIcons";
import { getAuthenticatedOnlyActions, getBaseActions } from "./actions";
import { useUserCtx } from "../../../users/components/users-ctx/context";
import { Fragment } from "react";

export function Header() {
    const router = useRouter()
    let actions = getBaseActions()
    const { user, logout } = useUserCtx()
    const onLogout = () => {
        logout()
        router.navigate("/users/login")
    }
    if (user) {
        actions = actions.concat(getAuthenticatedOnlyActions(onLogout))
    }
    return (
        <View className="flex-row p-2 gap-[30%] bg-white self-center justify-center w-full">
            <View className="self-center items-center justify-center">
                <Link href="/" asChild >
                    <TouchableOpacity>
                        <LogoIcon />
                    </TouchableOpacity>
                </Link>
            </View>
            <View className="flex-row gap-2 max-w-fit">
                {actions.map((action, i) => <Fragment key={i}>{action}</Fragment>)}
            </View>
        </View>
    );
}


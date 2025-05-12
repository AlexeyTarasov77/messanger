import { View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { LogoIcon } from "../../../../shared/ui/icons/headerIcons";
import { authenticatedOnlyActions, headersBaseActions } from "./actions";
import { useUserCtx } from "../../../users/components/users-ctx/context";
import { Fragment } from "react";

export function Header() {
    let actions = headersBaseActions
    const { user } = useUserCtx()
    if (user) {
        actions = actions.concat(authenticatedOnlyActions)
    }
    return (
        <View className="flex-row items-center justify-between p-2">
            <View className="justify-start">
                <Link href="/index" asChild>
                    <TouchableOpacity>
                        <LogoIcon />
                    </TouchableOpacity>
                </Link>
            </View>
            <View className="flex-row gap-2">
                {actions.map((action, i) => <Fragment key={i}>{action}</Fragment>)}
            </View>
        </View>
    );
}


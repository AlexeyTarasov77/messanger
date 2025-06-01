import { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { getUserDisplayName } from "../../users/utils";
import { IUser } from "../../users/types";
import { UserAvatar } from "../../users/components/avatar";


interface IFriendCardProps {
    user: IUser
    leftButton?: ReactNode;
    rightButton?: ReactNode;
}

export function FriendCard(props: IFriendCardProps) {
    const { user, leftButton, rightButton } =
        props;
    return (
        <View className="border-grey rounded-xl">
            <UserAvatar user={user} className="w-[96]" />
            <View>
                <Text className="">{user.firstName}</Text>
                <Text className="">{user.lastName}</Text>
            </View>
            <View>
                <Text className="text-xl text-black">@{getUserDisplayName(user)}</Text>
            </View>
            <View>
                {leftButton}
                {rightButton}
            </View>
        </View>
    );
}

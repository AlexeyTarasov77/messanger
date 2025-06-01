import { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import { ICONS } from "../../../shared/ui/icons";


interface IFriendCardProps {
    avatar: string;
    isOnline: boolean;
    firstName: string;
    lastName: string;
    username: string;
    leftButton: ReactNode;
    rightButton: ReactNode;
}

export function FriendCard(props: IFriendCardProps) {
    const { avatar, isOnline, firstName, lastName, username, leftButton, rightButton } =
        props;
    return (
        <View className="border-grey rounded-xl">
            <View>
                <Image source={{ uri: avatar }} className="rounded-full w-[96]" />
                <View className="absolute bottom-0 right-0">
                    {isOnline ? (
                        <ICONS.OnlineIcon width={18} height={18} />
                    ) : (
                        <ICONS.OfflineIcon width={18} height={18} />
                    )}
                </View>
            </View>
            <View>
                <Text className="">{firstName}</Text>
                <Text className="">{lastName}</Text>
            </View>
            <View>
                <Text>@{username}</Text>
            </View>
            <View>
                {leftButton}
                {rightButton}
            </View>
        </View>
    );
}

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
    rigthButton: ReactNode;
}

export function FriendCard(props: IFriendCardProps) {
    const { avatar, isOnline, firstName, lastName, username, leftButton, rigthButton } =
        props;
    return (
        <View>
            <View>
                <Image source={{ uri: avatar }} className="rounded-full w-" />
                <View className="absolute bottom-0 right-0">
                    {isOnline ? (
                        <ICONS.OnlineIcon width={12} height={12} />
                    ) : (
                        <ICONS.OfflineIcon width={12} height={12} />
                    )}
                </View>
            </View>
            <View>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
            </View>
            <View>
                <Text>{username}</Text>
            </View>
            <View>
                {leftButton}
                {rigthButton}
            </View>
        </View>
    );
}

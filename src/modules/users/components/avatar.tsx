import { Image, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";
import { useRouter } from "expo-router";
import { IUserAvatar } from "../types";
import { getUserAvatar } from "../utils";
import { DEFAULT_ICONS } from "../../../shared/ui/icons/icons";

export interface IUserAvatarProps {
    user: { id: number; profile: { avatars: IUserAvatar[] } };
    isUserOnline?: boolean;
    className?: string;
    onlineBadgeSize?: number;
    redirectUrl?: string;
    width?: number
    height?: number
}

export function UserAvatar({
    user,
    className,
    isUserOnline,
    onlineBadgeSize,
    redirectUrl,
    width,
    height
}: IUserAvatarProps ) {
    onlineBadgeSize = onlineBadgeSize || 15;
    const router = useRouter();
    const showIsOnline = isUserOnline !== undefined;
    return (
        <View className="flex-row">
            <TouchableOpacity
                onPress={() => {
                    redirectUrl || router.replace(`/profile/${user.id}`);
                }}
            >
                <View>
                    {getUserAvatar(user)?.image ? (
                        <Image
                            source={{ uri: getUserAvatar(user)?.image }}
                            className={`rounded-full ${className}`}
                        />
                    ) : (
                        <DEFAULT_ICONS.DEFAULT_AVATAR_ICON width={width} height={height} />
                    )}
                </View>
                {showIsOnline && (
                    <View className="absolute bottom-0 right-1">
                        {isUserOnline ? (
                            <ICONS.OnlineIcon
                                width={onlineBadgeSize}
                                height={onlineBadgeSize}
                            />
                        ) : (
                            <ICONS.OfflineIcon
                                width={onlineBadgeSize}
                                height={onlineBadgeSize}
                            />
                        )}
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

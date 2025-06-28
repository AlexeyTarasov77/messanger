import { Image, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";
import { useRouter } from "expo-router";
import { IUserAvatar } from "../types";
import { getUserAvatar } from "../utils";

export interface IUserAvatarProps {
    user: { id: number, profile: { avatars: IUserAvatar[] } };
    isUserOnline?: boolean;
    className?: string;
    onlineBadgeSize?: number;
    redirectUrl?: string
}

export function UserAvatar({
    user,
    className,
    isUserOnline,
    onlineBadgeSize,
    redirectUrl,
}: IUserAvatarProps) {
    onlineBadgeSize = onlineBadgeSize || 15
    const router = useRouter()
    const showIsOnline = isUserOnline !== undefined
    return (
        <View className="flex-row">
            <TouchableOpacity onPress={() => { redirectUrl || router.replace(`/profile/${user.id}`) }}>
                <View>
                    <Image
                        source={{ uri: getUserAvatar(user)?.image || DEFAULT_AVATAR_URL }}
                        className={`rounded-full ${className}`}
                    />
                </View>
                {showIsOnline &&
                    <View className="absolute bottom-0 right-1">
                        {isUserOnline ? (
                            <ICONS.OnlineIcon width={onlineBadgeSize} height={onlineBadgeSize} />
                        ) : (
                            <ICONS.OfflineIcon width={onlineBadgeSize} height={onlineBadgeSize} />
                        )}
                    </View>
                }
            </TouchableOpacity>
        </View>
    );
}


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
    width?: number;
    height?: number;
    redirectUrl?: string
}

export function UserAvatar({
    user,
    className,
    width,
    height,
    isUserOnline,
    redirectUrl,
}: IUserAvatarProps) {
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
                            <ICONS.OnlineIcon width={width} height={height} />
                        ) : (
                            <ICONS.OfflineIcon width={width} height={height} />
                        )}
                    </View>
                }
            </TouchableOpacity>
        </View>
    );
}


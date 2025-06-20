import { Image, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";
import { useRouter } from "expo-router";
import { IUserAvatar } from "../types";
import { getUserAvatar } from "../utils";

export interface IUserAvatarProps {
    user: { isOnline: boolean, id: string, profile: { avatars: IUserAvatar[] } };
    className?: string;
    width: number;
    height: number;
    showIsOnline?: boolean;
}

export function UserAvatar({
    user,
    className,
    width,
    height,
    showIsOnline
}: IUserAvatarProps) {
    const router = useRouter()
    if (showIsOnline === undefined) {
        showIsOnline = true
    }
    return (
        <View className="flex-row">
            <TouchableOpacity onPress={() => { router.replace(`/profile/${user.id}`) }}>
                <View>
                    <Image
                        source={{ uri: getUserAvatar(user)?.image || DEFAULT_AVATAR_URL }}
                        className={`rounded-full ${className}`}
                    />
                </View>
                {showIsOnline &&
                    <View className="absolute bottom-0 right-1">
                        {user.isOnline ? (
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


import { Image, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";

export function UserAvatar({
  user,
}: {
  user: { avatarUrl?: string; isOnline: boolean };
}) {
  return (
    <View className="flex-row">
      <View>
        <Image
          source={{ uri: user.avatarUrl || DEFAULT_AVATAR_URL }}
          className="w-10 h-10 rounded-full"
        />
      </View>
      <View className="absolute bottom-0 right-0">
        {user.isOnline ? (
          <ICONS.OnlineIcon width={12} height={12} />
        ) : (
          <ICONS.OfflineIcon width={12} height={12} />
        )}
      </View>
    </View>
  );
}

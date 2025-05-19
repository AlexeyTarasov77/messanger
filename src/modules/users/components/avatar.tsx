import { Image, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";

export function UserAvatar({ user }: { user: { avatarUrl?: string, isOnline: boolean } }) {
  const defaultAvatarUrl = "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
  return (
    <View className="flex-row">
      <View>
        <Image
          source={{ uri: user.avatarUrl || defaultAvatarUrl }}
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
  )
}

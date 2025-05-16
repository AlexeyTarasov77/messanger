import { ScrollView, View, Text, Image } from "react-native";
// import { user } from "../../../shared/constants/user";
import { ICONS } from "../../../shared/ui/icons";
import { UserPostCard } from "../components";
import { useUserCtx } from "../../users/components/users-ctx/context";

export function MyPosts() {
    const { user } = useUserCtx()
    return (
        <ScrollView className="bg-mainBg pt-4">
            <View className="gap-4 ">
                {user?.createdPosts?.map((post) => {
                    return (
                        <View className="border border-border rounded-2xl p-2 gap-2 bg-white">
                            <View className="flex-row justify-between py-4 px-2 " >
                                <View>
                                    <View className="flex-row items-center gap-4">
                                        <View className="flex-row">
                                            <View>
                                                <Image
                                                    source={{
                                                        uri: user?.avatarUrl,
                                                    }}
                                                    className="w-10 h-10"
                                                />
                                            </View>
                                            <View className="absolute bottom-0 right-0">
                                                {user.isOnline ? (
                                                    <ICONS.OnlineIcon
                                                        width={12}
                                                        height={12}
                                                    />
                                                ) : (
                                                    <ICONS.OfflineIcon
                                                        width={12}
                                                        height={12}
                                                    />
                                                )}
                                            </View>
                                        </View>
                                        <View className="font-medium text-sm">
                                            <Text>{user.username}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <ICONS.Signature />
                                    </View>
                                </View>
                                <View className="self-center">
                                    <ICONS.PostSettingsIcon height={16} />
                                </View>
                            </View>
                            <UserPostCard user={user} post={post} key={post.id}></UserPostCard>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}

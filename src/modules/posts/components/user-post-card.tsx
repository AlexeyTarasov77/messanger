import { View, Text, Image } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { IPost } from "../types";

export function UserPostCard({ post }: { post: IPost }) {
    return (
        <View>
            <View className="border-t border-border pt-4 px-2">
                <Text className="flex-wrap font-normal text-sm leading-none">
                    {post.body}
                </Text>
                <View className="flex-row flex-wrap font-normal text-sm leading-none">
                    {post.tags.map(tag => (
                        <Text className="text-text" key={tag.id}>
                            #{tag.name}
                        </Text>
                    ))}
                </View>
                <View className="flex-row flex-wrap justify-center">
                    {post.media.map(media => (
                        <Image
                            key={media.id}
                            source={{ uri: media.url }}
                            className="rounded-2xl m-2 w-40 h-60"
                        />
                    ))}
                </View>
            </View>
            <View className="flex-row gap-4">
                <View className="flex-row items-center">
                    <ICONS.LikeIcon width={20} height={20} />
                    <Text> {post._count.likedBy} Вподобань</Text>
                </View>

                <View className="flex-row ">
                    <ICONS.EyeIcon width={20} height={20} />
                    <Text> {post._count.viewedBy} Переглядів</Text>
                </View>
            </View>
        </View>
    );
}

import { View, Text, Image } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { IPostWithAuthor } from "../types";
import { UserAvatar } from "../../users/components/avatar";
import { getUserDisplayName } from "../../users/utils";
import { UserSignature } from "../../users/components/sig";

export function PostCard({ post }: { post: IPostWithAuthor }) {
    return (
        <View className="border border-border rounded-2xl p-2 gap-2 bg-white">
            <View className="flex-row justify-between py-4 px-2">
                <View>
                    <View className="flex-row items-center gap-4">
                        <UserAvatar user={post.author} />
                        <View className="font-medium text-sm">
                            <Text>{getUserDisplayName(post.author)}</Text>
                        </View>
                    </View>
                    {post.author.signatureUrl && <UserSignature signatureUrl={post.author.signatureUrl} />}
                </View>
                <View className="self-center">
                    <ICONS.PostSettingsIcon height={16} />
                </View>
            </View>
            <View className="border-t border-border pt-4 px-2 gap-4">
                <Text className="flex-wrap text-lg leading-none font-main font-medium">
                    {post.title}
                </Text>
                <Text className="flex-wrap font-normal text-sm leading-none">
                    {post.body}
                </Text>
                <View className="flex-row flex-wrap font-normal text-sm leading-none">
                    {post.tags?.map(tag => (
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


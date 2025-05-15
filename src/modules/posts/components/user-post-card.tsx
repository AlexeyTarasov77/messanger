import { View, Text, Image } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { IUser } from "../../users/types";
import { IPost } from "../../../shared/types";

interface IUserPostProps {
    user: IUser;
    post: IPost;
}

export function UserPostCard({user, post}: IUserPostProps) {
    return (
        <View>
            <View className="border-t border-border pt-4 px-2">
                <Text className="flex-wrap font-normal text-sm leading-none">
                    {post.body}
                </Text>
                <View className="flex-row flex-wrap font-normal text-sm leading-none">
                    {post.tags.map((tag, index) => (
                        <Text className="text-text" key={index}>
                            #{tag}
                        </Text>
                    ))}
                </View>
                <View className="flex-row flex-wrap justify-center">
                    {post.media.map((img, index) => (
                        <Image
                            key={index}
                            source={{ uri: img.url }}
                            className="rounded-2xl m-2 w-40 h-60"
                        />
                    ))}
                </View>
            </View>
            <View className="flex-row gap-4">
                <View className="flex-row items-center">
                    <ICONS.LikeIcon width={20} height={20} />
                    <Text> {post.likesCount} Вподобань</Text>
                </View>

                <View className="flex-row ">
                    <ICONS.EyeIcon width={20} height={20} />
                    <Text> {post.viewsCount} Переглядів</Text>
                </View>
            </View>
        </View>
    );
}

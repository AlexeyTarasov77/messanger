import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { Button } from "../button";
import { ICONS } from "../icons";
import { posts } from "../../constants";
export interface IPost {
    id: number;
    body: string;
    tags: string[];
    likesCount: number;
    viewsCount: number;
    media: {
        type: string;
        url: string;
    }[];
    author: {
        username: string;
        avatarUrl: string;
        isOnline: boolean;
    };
}

interface IPostProps {
    post: IPost;
}

export function PostCard(props: IPostProps) {
    const { post } = props;
    return (
        <View className="border border-border rounded-2xl p-2 gap-2">
            <View className="flex-row justify-between py-4 px-2">
                <View className="flex-row items-center gap-4">
                    <View className="flex-row">
                        <View>
                            <Image
                                source={{ uri: post.author.avatarUrl }}
                                className="w-10 h-10"
                            />
                        </View>
                        <View className="absolute bottom-0 right-0">
                            {post.author.isOnline ? (
                                <ICONS.OnlineIcon width={12} height={12} />
                            ) : (
                                <ICONS.OfflineIcon width={12} height={12} />
                            )}
                        </View>
                    </View>
                    <View className="font-medium text-sm">
                        <Text>{post.author.username}</Text>
                    </View>
                </View>
                <View className="self-center">
                    <ICONS.PostSettingsIcon height={16} />
                </View>
            </View>
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
                    {post.media.map((img) => (
                        <Image
                            source={{ uri: img.url }}
                            className="rounded-2xl m-2 w-40 h-60"
                        />
                    ))}
                </View>
            </View>
            <View className="flex-row gap-4">
                <View className="flex-row items-center">
                    <ICONS.LikeIcon width={20} height={20} /> 
                    <Text >{" "}{post.likesCount}{" "} Вподобань</Text>
                </View>

                <View className="flex-row ">
                    <ICONS.EyeIcon width={20} height={20} /> 
                    <Text>{" "}{post.viewsCount}{" "} Переглядів</Text>
                </View>
            </View>
        </View>
    );
}

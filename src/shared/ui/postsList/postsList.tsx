import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { Link } from "expo-router";
import { Button } from "../button";
import { ICONS } from "../icons";
import { PostCard } from "../postCard";
import { posts } from "../../constants";

export function PostsList() {
    return (
        <ScrollView>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <View className="border border-black rounded-2xl p-2">
                            <View className="flex-row justify-around">
                                <View>
                                    <Image
                                        source={{ uri: item.author.avatarUrl }}
                                        className="w-10 h-10"
                                    />
                                </View>
                                <Text>{item.author.username}</Text>
                                <Text>
                                    {item.author.isOnline
                                        ? "Online"
                                        : "Offline"}
                                </Text>
                            </View>
                            <View>
                                <Text>{item.body}</Text>
                                <View className="flex-row flex-wrap">
                                    {item.tags.map((tag, index) => (
                                        <Text key={index}>#{tag}</Text>
                                    ))}
                                </View>
                                <View className="flex-row">
                                    {item.media.map((img) => (
                                        <Image
                                            source={{ uri: img.url }}
                                            className="w-40 h-40 rounded-2xl m-2"
                                        />
                                    ))}
                                </View>
                            </View>
                            <View className="flex-row justify-between items-center w-fit">
                                <Text className="flex-row self-center items-center justify-center"><ICONS.LikesIcon width={20} height={20}/> {item.likesCount}Вподобань</Text>
                                <Text className="self-center items-center justify-center"><ICONS.EyeIcon width={20} height={20}/> {item.viewsCount}Переглядів</Text>
                            </View>
                        </View>
                    );
                }}
            ></FlatList>

            {/* <View className="flex-row items-center gap-5 justify-start">
                <Button.UserAvatarTypeOne />
                <Text className="text-white dark:text-bgLight font-bold">X_AE_A-13</Text>
            </View>
            <View className="flex-row gap-2">
                <TouchableOpacity className="">
                        <ICONS.Icon width={30} height={30} />
                </TouchableOpacity> */}

            {/* className=" border-text border rounded-full p-2 flex-row gap-2 border-text justify-start border rounded-full p-2 " */}
            {/* </View> */}
        </ScrollView>
    );
}

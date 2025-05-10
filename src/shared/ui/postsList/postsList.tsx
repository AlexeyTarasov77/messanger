import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Link } from "expo-router";
import { Button } from "../button";
import { ICONS } from "../icons";
import { posts } from "../../constants";

export function PostsList() {
    return (
        <ScrollView>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View>
                                <Text>{item.author.avatarUrl}</Text>
                                <Text>{item.author.username}</Text>
                                <Text>{item.author.isOnline}</Text>
                            </View>
                            <View>
                                <Text>{item.body}</Text>
                                <Text>{item.tags}</Text>
                                <View>
                                    {/* <Text>{item.media}</Text> */}
                                </View>
                            </View>
                            <View>
                                <Text>{item.likesCount}</Text>
                                <Text>{item.viewsCount}</Text>
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

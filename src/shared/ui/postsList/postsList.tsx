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
            <View className="gap-8">
                {posts.map((item) => {
                    return <PostCard post={item} key={item.id}></PostCard>;
                })}
            </View>
            {/* <View className="flex-row items-center gap-5 justify-start">
                <Button.UserAvatarTypeOne />
                <Text className="text-white dark:text-bgLight font-bold">X_AE_A-13</Text>
            </View>
            <View className="flex-row gap-2">
                <TouchableOpacity className="">
                        {/* <ICONS.Icon width={30} height={30} /> */}
            {/* </TouchableOpacity>  */}

            {/* className=" border-text border rounded-full p-2 flex-row gap-2 border-text justify-start border rounded-full p-2 " */}
            {/* </View>  */}
        </ScrollView>
    );
}

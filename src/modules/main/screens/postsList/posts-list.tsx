import { View, ScrollView } from "react-native";
import { PostCard } from "../../components";
import { posts } from "../../../../shared/constants";

export function PostsList() {
    return (
        <ScrollView className="bg-mainBg pt-4">
            <View className="gap-4 ">
                {posts.map((item) => {
                    return <PostCard post={item} key={item.id}></PostCard>;
                })}
            </View>
        </ScrollView>
    );
}

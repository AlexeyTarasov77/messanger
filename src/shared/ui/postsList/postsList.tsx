import { View, ScrollView } from "react-native";

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
        </ScrollView>
    );
}

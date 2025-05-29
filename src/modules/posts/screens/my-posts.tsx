import { ScrollView, View } from "react-native";
import { useUserCtx } from "../../users/components/users-ctx/context";
import { PostCard } from "../components";
import { Redirect } from "expo-router";

export function MyPosts() {
    let { user } = useUserCtx()
    if (!user) {
        return <Redirect href="/users/login" />
    }
    return (
        <ScrollView className="bg-mainBg pt-4">
            <View className="gap-4 ">
                {user.createdPosts.map((post) =>
                    <PostCard menuEnabled={true} key={post.id} post={{ ...post, author: user }}/>
                )}
            </View>
        </ScrollView>
    );
}

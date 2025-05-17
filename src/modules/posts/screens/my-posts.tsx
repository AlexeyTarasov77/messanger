import { ScrollView, View } from "react-native";
import { useUserCtx } from "../../users/components/users-ctx/context";
import { PostCard } from "../components";

export function MyPosts() {
    let { user } = useUserCtx()
    user = user! // assert that user is not null
    return (
        <ScrollView className="bg-mainBg pt-4">
            <View className="gap-4 ">
                {user.createdPosts.map((post) =>
                    <PostCard key={post.id} post={{ ...post, author: user }}></PostCard>
                )}
            </View>
        </ScrollView>
    );
}

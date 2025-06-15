import { ScrollView, View } from "react-native";
import { useGetUserById } from "../hooks/use-get-user-by-id";
import { PostCard } from "../../posts/components";


export function UserPosts(userId: number) {
    let { user } = useGetUserById(userId);
    if (!user) {
        return "User does not exist";
    }
    return (
        <ScrollView className="bg-white pt-4">
            <View className="gap-4 pb-8r">
                {user.createdPosts.map((post) => (
                    <PostCard
                        menuEnabled={true}
                        key={post.id}
                        post={{ ...post, author: user }}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

import { ScrollView, Text, View } from "react-native";
import { useUserCtx } from "../../users/components/users-ctx";
import { PostCard } from "../components";
import { Redirect } from "expo-router";

export function MyPosts() {
  let { user } = useUserCtx();
  if (!user) {
    return <Redirect href="/users/login" />;
  }
  return (
    <ScrollView className="bg-mainBg pt-4">
      {!user.profile.posts.length &&
        <Text className="text-2xl text-center text-slive">В тебе ще нема жодних постiв. Нажми на плюс вверху экрану щоб створити!</Text>
      }
      <View className="gap-4 pb-8r">
        {user.profile?.posts.map((post) => (
          <PostCard
            menuEnabled={true}
            key={post.id}
            post={{ ...post, author: { user: user, ...user.profile } }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

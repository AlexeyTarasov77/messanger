import { View, ScrollView } from "react-native";
import { PostCard } from "../components";
import { usePosts } from "../hooks/use-posts";
import { Loader } from "../../../shared/ui/loader/loader";


export function PostsList() {
  const { posts, isLoading } = usePosts()
  if (isLoading) return <Loader />
  return (
    <ScrollView className="bg-mainBg pt-4">
      <View className="gap-4 ">
        {posts.map((item) => {
          return <PostCard menuEnabled={false} post={item} key={item.id}/>;
        })}
      </View>
    </ScrollView>
  );
}

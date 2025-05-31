import { ScrollView, View, Text } from "react-native";
import { Card } from "../components/card";
import { FriendCard } from "../components/friend-card";
import { Loader } from "../../../shared/ui/loader/loader";
import { useAllFriends } from "../hooks/use-all-friends";


export function AllFriends() {
    const { allFriends, isLoading } = useAllFriends();
    if (isLoading) return <Loader />;
    return (
        <ScrollView>
        <Card title={"Всі друзі"} seeAllLink={"/friends/all-friends"}>
            {allFriends.map((friend) => {
                return (
                    <FriendCard
                        avatar={friend.avatarUrl || ""}
                        isOnline={friend.isOnline||false}
                        firstName={friend.firstName ||""}
                        lastName={friend.lastName ||""}
                        username={friend.username|| ""}
                        leftButton={undefined}
                        rigthButton={undefined}
                    />
                );
            })}
        </Card>
        </ScrollView>
    );
}

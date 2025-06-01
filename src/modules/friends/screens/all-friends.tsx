import { ScrollView, View, Text } from "react-native";
import { Card } from "../components/card";
import { FriendCard } from "../components/friend-card";
import { Loader } from "../../../shared/ui/loader/loader";
import { useAllFriends } from "../hooks/use-all-friends";

export function AllFriends() {
    const { allFriends, isLoading } = useAllFriends();
    console.log("AllFriends", allFriends);
    if (isLoading) return <Loader />;
    return (
        <ScrollView>
            <Card title={"Всі друзі"} seeAllLink={"/friends/all-friends"}>
                {allFriends.map((friend) => {
                    return (
                        <FriendCard
                            key={friend.id}
                            user={friend}
                            leftButton={undefined}
                            rightButton={undefined}
                        />
                    );
                })}
            </Card>
        </ScrollView>
    );
}

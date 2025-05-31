import { ScrollView, View, Text } from "react-native";
import { Card } from "../components/card";
import { FriendCard } from "../components/friend-card";
import { Loader } from "../../../shared/ui/loader/loader";
import { useRecommendations } from "../hooks/use-recommendations";

export function Recommendations() {
    const { recommendations, isLoading } = useRecommendations();
    if (isLoading) return <Loader />;
    return (
        <ScrollView>
            <Card
                title={"Рекомендації"}
                seeAllLink={"/friends/recommendations"}
            >
                {recommendations.map((user) => {
                    return (
                        <FriendCard
                            avatar={user.avatarUrl || ""}
                            isOnline={user.isOnline || false}
                            firstName={user.firstName || ""}
                            lastName={user.lastName || ""}
                            username={user.username|| ""}
                            leftButton={undefined}
                            rigthButton={undefined}
                        />
                    );
                })}
            </Card>
        </ScrollView>
    );
}

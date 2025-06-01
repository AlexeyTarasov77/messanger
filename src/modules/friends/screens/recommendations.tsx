import { ScrollView } from "react-native";
import { Card } from "../components/card";
import { FriendCard } from "../components/friend-card";
import { Loader } from "../../../shared/ui/loader/loader";
import { useRecommendations } from "../hooks/use-recommendations";

export function Recommendations() {
    const { recommendations, isLoading } = useRecommendations();
    console.log("Recommendations", recommendations);
    if (isLoading) return <Loader />;
    return (
        <ScrollView>
            <Card title={"Рекомендації"} seeAllLink={"/friends/recommendations"}>
                {recommendations.map((user) => {
                    return (
                        <FriendCard
                            key={user.id}
                            avatar={user.avatarUrl || ""}
                            isOnline={user.isOnline || false}
                            firstName={user.firstName || ""}
                            lastName={user.lastName || ""}
                            username={user.username || ""}
                            leftButton={undefined}
                            rightButton={undefined}
                        />
                    );
                })}
            </Card>
        </ScrollView>
    );
}

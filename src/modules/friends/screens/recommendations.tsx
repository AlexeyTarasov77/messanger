import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { Card } from "../components/card";
import { FriendCard } from "../components/friend-card";
import { Loader } from "../../../shared/ui/loader/loader";
import { useRecommendations } from "../hooks/use-recommendations";

export function Recommendations() {
    const { recommendations, isLoading } = useRecommendations();
    console.log("Recommendations", recommendations);
    if (isLoading) return <Loader />;
    return (
  
        <Card title={"Рекомендації"} seeAllLink={"/friends/recommendations"}>
            {recommendations.map((user) => {
                return (
                    <FriendCard
                        key={user.id}
                        user={user}
                        leftButton={
                            <TouchableOpacity
                                // onPress={}
                                className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
                            >
                                <Text className="text-white text-center pl-3 pr-3">
                                    Додати
                                </Text>
                            </TouchableOpacity>
                        }
                        rightButton={
                            <TouchableOpacity
                                // onPress={}
                                className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]"
                            >
                                <Text className="text-slive text-center pl-3 pr-3">
                                    Видалити
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                );
            })}
        </Card>

    );
}

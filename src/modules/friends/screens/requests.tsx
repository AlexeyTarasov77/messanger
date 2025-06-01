import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { FriendCard } from "../components/friend-card";
import { Card } from "../components/card";
import { useRequests } from "../hooks/use-requests";
import { Loader } from "../../../shared/ui/loader/loader";
import { Links } from "../components/links";

export function Requests() {
    const { requests, isLoading } = useRequests();
    console.log("Requests", requests);
    if (isLoading) return <Loader />;
    return (
        <Card title={"Запити"} seeAllLink={"/friends/requests"}>
            {requests.map((user) => {
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
                                    Підтвердити
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

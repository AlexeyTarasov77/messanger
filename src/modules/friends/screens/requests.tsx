import { ScrollView, View, Text } from "react-native";
import { FriendCard } from "../components/friend-card";
import { Card } from "../components/card";
import { useRequests } from "../hooks/use-requests";
import { Loader } from "../../../shared/ui/loader/loader";
import { Links } from "../components/links";

export function Requests() {
    const { requests, isLoading } = useRequests();
    if (isLoading) return <Loader />;
    return (
        <ScrollView>
            <Card title={"Запити"} seeAllLink={"/friends/requests"}>
                {requests.map((user) => {
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

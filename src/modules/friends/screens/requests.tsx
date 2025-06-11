import { ScrollView, Alert, View, Text, TouchableOpacity } from "react-native";
import { FriendCard } from "../components/friend-card";
import { Card } from "../components/card";
import { useRequests } from "../hooks/use-requests";
import { Loader } from "../../../shared/ui/loader/loader";
import { Links } from "../components/links-bar";
import { friendsService } from "../services";
import { useUserCtx } from "../../users/components/users-ctx/context";
import { getErrorMessage } from "../../../shared/utils/errors";
import { useDeleteUserModal } from "../components/delete-modal-ctx";

export function Requests() {
    const { requests, isLoading, setRequests } = useRequests();
    const { user } = useUserCtx();
    const { open } = useDeleteUserModal();
    if (isLoading || !user) return <Loader />;

    const removeRequest = async (
        fromUserId: number,
        action: "accept" | "decline"
    ) => {
        try {
            if (action === "accept") {
                await friendsService.acceptRequest(fromUserId);
            } else {
                await friendsService.declineRequest(fromUserId);
            }
        } catch (err) {
            Alert.alert(getErrorMessage(err));
            return;
        }
        setRequests(
            requests.filter((fromUser) => Number(fromUser.id) !== fromUserId)
        );
    };

    const acceptRequest = async (fromUserId: number) =>
        await removeRequest(fromUserId, "accept");
    const declineRequest = async (fromUserId: number) =>
        removeRequest(fromUserId, "decline");

    return (
        <Card title={"Запити"} seeAllLink={"/friends/requests"}>
            {requests.map((requestUser) => {
                return (
                    <FriendCard
                        key={requestUser.id}
                        user={requestUser}
                        leftButton={
                            <TouchableOpacity
                                onPress={() =>
                                    acceptRequest(Number(requestUser.id))
                                }
                                className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
                            >
                                <Text className="text-white text-center pl-3 pr-3">
                                    Підтвердити
                                </Text>
                            </TouchableOpacity>
                        }
                        rightButton={
                            <TouchableOpacity
                                // onPress={async () => declineRequest(Number(requestUser.id))}
                                onPress={() => {
                                    open(() =>
                                        declineRequest(Number(requestUser.id))
                                    );
                                }}
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

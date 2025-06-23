import { Alert, View, Text, TouchableOpacity } from "react-native";
import { FriendCard } from "../components/friend-card";
import { Card } from "../components/card";
import { useRequests } from "../hooks/use-requests";
import { Loader } from "../../../shared/ui/loader/loader";
import { friendsService } from "../services";
import { useUserCtx } from "../../users/components/users-ctx";
import { getErrorMessage } from "../../../shared/utils/errors";
import { ModalName, useModal } from "../../../shared/context/modal";

export function Requests() {
    const { requests, isLoading, setRequests } = useRequests();
    const { user } = useUserCtx();
    const { open } = useModal();
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

    return requests && requests.length > 0 ? (
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
                                <Text className="text-white text-center px-3">
                                    Підтвердити
                                </Text>
                            </TouchableOpacity>
                        }
                        rightButton={
                            <TouchableOpacity
                                // onPress={async () => declineRequest(Number(requestUser.id))}
                                onPress={() => {
                                    open({
                                        name: ModalName.CONFIRMATION, props: {
                                            onConfirm: async () =>
                                                declineRequest(Number(requestUser.id)),
                                            label: "Ви дійсно хочете видалити користувача?"
                                        }
                                    }
                                    );
                                }}
                                className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]"
                            >
                                <Text className="text-slive text-center px-3">
                                    Видалити
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                );
            })}
        </Card>
    ) : (
        <View className="bg-white p-4 border-border m-2 rounded-xl ">
            <Text className="text-slive pl-2">У тебе немає запитів.</Text>
        </View>
    );
}

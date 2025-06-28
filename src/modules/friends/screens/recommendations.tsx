import { ScrollView, TouchableOpacity, Text, View, Alert } from "react-native";
import { Card } from "../components/card";
import { FriendCard } from "../components/friend-card";
import { Loader } from "../../../shared/ui/loader/loader";
import { useRecommendations } from "../hooks/use-recommendations";
import { friendsService } from "../services";
import { useUserCtx } from "../../users/components/users-ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXCLUDED_RECOMMENDED_USERS_KEY } from "../../../shared/constants";
import { useEffect } from "react";
import { ModalName, useModal } from "../../../shared/context/modal";

export function Recommendations({ showAll }: { showAll?: boolean }) {
    const { recommendations, isLoading, setRecommendations } =
        useRecommendations();
    const { user } = useUserCtx();
    const { open } = useModal();
    useEffect(() => {
        const func = async () => {
            const excludedIdsString = await AsyncStorage.getItem(
                EXCLUDED_RECOMMENDED_USERS_KEY
            );
            if (!excludedIdsString) return;
            const excludedIds = excludedIdsString.split(",");
            setRecommendations(
                recommendations.filter(
                    (user) => !excludedIds.includes(String(user.id))
                )
            );
        };
        !showAll && !isLoading && func();
    }, [isLoading, showAll]);
    if (isLoading || !user) return <Loader />;
    const createFriendRequest = async (toUserId: number) => {
        try {
            await friendsService.createFriendRequest(toUserId);
            setRecommendations(
                recommendations.filter(
                    (recommendedUser) => recommendedUser.id !== toUserId
                )
            );
        } catch (err) {
            console.error(err);
            Alert.alert("Не вдалося створити заявку. Спробуйте пiзнiше!");
        }
    };
    const removeRecommendedUser = async (id: number) => {
        setRecommendations(
            recommendations.filter(
                (recommendedUser) => recommendedUser.id !== id
            )
        );
        await friendsService.removeRecommendedUser(String(id));
    };
    return (
        <Card title={"Рекомендації"} seeAllLink={"/friends/recommendations"}>
            {recommendations.map((recommendedUser) => {
                return (
                    <FriendCard
                        key={recommendedUser.id}
                        user={recommendedUser}
                        leftButton={
                            <TouchableOpacity
                                onPress={async () =>
                                    await createFriendRequest(
                                        recommendedUser.id
                                    )
                                }
                                className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
                            >
                                <Text className="text-white text-center px-3">
                                    Додати
                                </Text>
                            </TouchableOpacity>
                        }
                        rightButton={
                            <TouchableOpacity
                                onPress={() => {
                                    open({
                                        name: ModalName.CONFIRMATION,
                                        props: {
                                            onConfirm: async () =>
                                                removeRecommendedUser(
                                                    recommendedUser.id
                                                ),
                                            label: "Ви дійсно хочете видалити користувача?",
                                        },
                                    });
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
    );
}

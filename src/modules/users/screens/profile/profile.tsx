import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { getUserDisplayName } from "../../utils";
import { UserAvatar } from "../../components/avatar";
import { ICONS } from "../../../../shared/ui/icons";
import { useGetUserById } from "../../hooks/use-get-user-by-id";
import { Loader } from "../../../../shared/ui/loader/loader";
import { PostCard } from "../../../posts/components";
import { AlbumPreview } from "../../components/album-preview";
import { useAllFriends } from "../../../friends/hooks/use-all-friends";
import { useRequests } from "../../../friends/hooks/use-requests";
import { ModalName, useModal } from "../../../../shared/context/modal";
import { chatsService } from "../../../chats/services/chats";
import { friendsService, funcButtons } from "../../../friends/services";
import { useRecommendations } from "../../../friends/hooks/use-recommendations";
import { useEffect } from "react";
import { EXCLUDED_RECOMMENDED_USERS_KEY } from "../../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile({ showAll }: { showAll?: boolean }) {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { open } = useModal();
    const userId = Number(id);
    const { deleteFriend, declineRequest, acceptRequest } = funcButtons();

    const { user, isLoading, error } = useGetUserById(userId);
    console.log(
        "PostCard tags:",
        JSON.stringify(user?.profile.posts.map((post) => post.tags))
    );
    const { allFriends } = useAllFriends();
    const { requests } = useRequests();
    const { recommendations, setRecommendations } = useRecommendations();
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
    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        Alert.alert("Не удалось получить пользователя", error);
        return;
    }
    if (!user) return <Redirect href="/not-found" />;

    let content;
    const isFriend = allFriends.some((friend) => friend.id === user.id);
    const hasRequest = requests.some((request) => request.id === user.id);

    if (isFriend) {
        content = (
            <View className="flex-row justify-between items-center gap-4">
                <TouchableOpacity
                    onPress={async () => {
                        const personalChat =
                            await chatsService.getOrCreatePersonalChat(user.id);
                        router.push(`/chats/${personalChat.id}`);
                    }}
                    className="bg-slive p-2 rounded-[1234]"
                >
                    <Text className="text-white px-3">Повідомлення</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        open({
                            name: ModalName.CONFIRMATION,
                            props: {
                                onConfirm: async () =>
                                    deleteFriend(Number(user.id)),
                                label: "Ви дійсно хочете видалити користувача?",
                            },
                        });
                    }}
                    className="border border-slive p-2 rounded-[1234]"
                >
                    <Text className="text-slive px-3">Видалити</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (hasRequest) {
        content = (
            <View className="flex-row justify-between items-center gap-4">
                <TouchableOpacity
                    onPress={() => acceptRequest(Number(user.id))}
                    className="bg-slive p-2 rounded-[1234]"
                >
                    <Text className="text-white px-3">Підтвердити</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        open({
                            name: ModalName.CONFIRMATION,
                            props: {
                                onConfirm: async () =>
                                    declineRequest(Number(user.id)),
                                label: "Ви дійсно хочете видалити користувача?",
                            },
                        });
                    }}
                    className="border border-slive p-2 rounded-[1234]"
                >
                    <Text className="text-slive px-3">Видалити</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        content = (
            <View className="flex-row justify-between items-center gap-4">
                <TouchableOpacity
                    onPress={async () =>
                                    await createFriendRequest(
                                        user.id
                                    )
                                }
                    className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
                >
                    <Text className="text-white text-center px-3">Додати</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                                    open({
                                        name: ModalName.CONFIRMATION,
                                        props: {
                                            onConfirm: async () =>
                                                removeRecommendedUser(
                                                    user.id
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
            </View>
        );
    }
    return (
        <ScrollView className="bg-mainBg h-full">
            <View className="gap-10 py-6 bg-white border-border justify-center items-center">
                <UserAvatar user={user} className="w-28 h-28" />
                <View className="justify-center items-center gap-2 ">
                    <Text className=" text-4xl font-semibold ">
                        {getUserDisplayName(user)}
                    </Text>

                    <Text className="justify-center items-center font-normal text-2xl">
                        @{user.username}
                    </Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <View className="border-r border-border justify-center items-center flex-1">
                        <Text className="self-center font-bold justify-center text-xl">
                            {user.profile.posts.length}
                        </Text>
                        <Text className="text-grey justify-center text-xl">
                            Дописи
                        </Text>
                    </View>
                    <View className="border-r border-border justify-center items-center flex-1">
                        <Text className="self-center font-bold justify-center text-xl">
                            {user.profile.posts.reduce(
                                (sum, post) => sum + post._count.views,
                                0
                            )}
                        </Text>
                        <Text className="text-grey justify-center text-xl">
                            Читачі
                        </Text>
                    </View>
                    <View className="border-r border-border justify-center items-center flex-1">
                        <Text className="self-center font-bold justify-center text-xl">
                            {user.friendsCount}
                        </Text>
                        <Text className="text-grey justify-center text-xl">
                            Друзі
                        </Text>
                    </View>
                </View>
                <View>{content}</View>
            </View>

            {/* albums */}
            {user.profile.albums.length ? (
                <View className="mt-4 border-border m-2 rounded-xl p-2 bg-white">
                    <View className="bg-white rounded-xl mb-6 pb-2">
                        <View className="flex-row justify-between px-2 py-4 border-b border-border">
                            <View className="flex-row gap-2">
                                <ICONS.AlbumIcon stroke={"#81818D"} />
                                <Text className="font-medium text-grey text-base">
                                    Альбоми
                                </Text>
                            </View>
                            <Link href="/">
                                <Text className="font-medium text-base text-slive">
                                    Дивитись всі
                                </Text>
                            </Link>
                        </View>

                        <ScrollView className="bg-white pt-4">
                            <View className="gap-4 pb-8r flex-row flex-wrap">
                                {user.profile.albums.map((album) => (
                                    <AlbumPreview
                                        key={album.id}
                                        album={album}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            ) : (
                <View className="bg-white p-4 border-border m-2 rounded-xl ">
                    <Text className="text-slive pl-2">
                        У цього користувача немає альбомів.
                    </Text>
                </View>
            )}

            {user.profile.posts.length ? (
                <ScrollView className="bg-white pt-4">
                    <View className="gap-4 pb-8r">
                        {user.profile.posts.map((post) => (
                            <PostCard
                                menuEnabled={true}
                                key={post.id}
                                post={{
                                    ...post,
                                    author: { user: user, ...user.profile },
                                    tags: post.tags.map((t: any) => t.tag),
                                }}
                            />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View className="bg-white p-4 border-border m-2 rounded-xl ">
                    <Text className="text-slive pl-2">
                        У цього користувача немає постів.
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

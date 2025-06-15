import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useUserCtx } from "../../components/users-ctx/context";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import { getUserDisplayName } from "../../utils";
import { UserAvatar } from "../../components/avatar";
import { ICONS } from "../../../../shared/ui/icons";
import { MyPosts, PostsList } from "../../../posts/screens";
import { useGetUserById } from "../../hooks/use-get-user-by-id";
import { UserPosts } from "../../components/user-posts";
import { usersService } from "../../services";

export function Profile() {
    const { id } = useLocalSearchParams();
    const userId = Number(id);
    const { user, isLoading } = useGetUserById(userId);
    if (!user) {
        return "User does not exist";
    }
    return (
        <ScrollView className="bg-mainBg h-full">
            <View className="gap-10 py-6 bg-white border-border justify-center items-center">
                <UserAvatar
                    user={user}
                    width={18}
                    height={18}
                    className="w-28 h-28"
                />
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
                            3
                        </Text>
                        <Text className="text-grey justify-center text-xl">
                            Дописи
                        </Text>
                    </View>
                    <View className="border-r border-border justify-center items-center flex-1">
                        <Text className="self-center font-bold justify-center text-xl">
                            12.1K
                        </Text>
                        <Text className="text-grey justify-center text-xl">
                            Читачі
                        </Text>
                    </View>
                    <View className="border-r border-border justify-center items-center flex-1">
                        <Text className="self-center font-bold justify-center text-xl">
                            222
                        </Text>
                        <Text className="text-grey justify-center text-xl">
                            Друзі
                        </Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center gap-4">
                    <TouchableOpacity
                        // onPress={() => acceptRequest(Number(requestUser.id))}
                        className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
                    >
                        <Text className="text-white text-center px-3">
                            Підтвердити
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={async () => declineRequest(Number(requestUser.id))}
                        // onPress={() => {
                        //     open(async () =>
                        //         declineRequest(Number(requestUser.id))
                        //     );
                        // }}
                        className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]"
                    >
                        <Text className="text-slive text-center pl-3 pr-3">
                            Видалити
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* albums */}
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
                    <View className="pt-4 gap-2">
                        <Text className="font-bold">Настрій</Text>
                        <View className="flex-row gap-4">
                            <Text>Природа</Text>
                            <Text className="text-grey"> 2025 рік</Text>
                        </View>
                    </View>
                    <ScrollView></ScrollView>
                </View>
            </View>
            {/* Posts */}
            <View className="mt-4 border-border m-2 rounded-xl p-2 bg-white"></View>
            {/* <PostsList /> */}
            <UserPosts userId={userId} />
        </ScrollView>
    );
}

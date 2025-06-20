import { Text, TouchableOpacity } from "react-native";
import { IUserAvatarProps, UserAvatar } from "../../../users/components/avatar";
import { getUserDisplayName } from "../../../users/utils";
import { useLocalSearchParams, useRouter } from "expo-router";

export function ChatListCard({
    user
}: { user: IUserAvatarProps["user"] }) {
    const { id } = useLocalSearchParams()
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`/chats/${id}`);
            }}
            className="flex-row items-center gap-4 p-3 "
        >
            <UserAvatar
                width={50}
                height={50}
                user={user}
            />
            <Text className="text-base font-medium">
                getUserDisplayName(user)
            </Text>
        </TouchableOpacity>
    );
}

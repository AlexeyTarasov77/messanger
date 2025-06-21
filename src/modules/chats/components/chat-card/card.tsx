import { Text, TouchableOpacity } from "react-native";
import { UserAvatar } from "../../../users/components/avatar";
import { getUserDisplayName } from "../../../users/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IUser } from "../../../users/types";

export function ChatListCard({
    user
}: { user: IUser }) {
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
                user={user}
                showIsOnline={false}
                className="w-12 h-12"
            />
            <Text className="text-base font-medium">
                {getUserDisplayName(user)}
            </Text>
        </TouchableOpacity>
    );
}

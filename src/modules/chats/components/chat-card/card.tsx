import { View, Text, Image, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { IChatListCard } from "../../types";
import { UserAvatar } from "../../../users/components/avatar";
import { getUserDisplayName } from "../../../users/utils";
import { UserSignature } from "../../../users/components/sig";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export function ChatListCard({
    avatarUrl,
    username,
    firstName,
    lastName,
}: IChatListCard) {
    const {id} = useLocalSearchParams()
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`/chats/${id}`);
            }}
            className="flex-row items-center gap-4 p-3 "
        >
            <UserAvatar.UserAvatarWithoutOnline
                width={50}
                height={50}
                user={{ avatarUrl, id: "1", isOnline: true }}
            />
            <Text className="text-base font-medium">
                {firstName} {lastName}
            </Text>
        </TouchableOpacity>
    );
}

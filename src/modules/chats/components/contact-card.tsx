import { Text, TouchableOpacity } from "react-native";
import { UserAvatar } from "../../users/components/avatar";
import { getUserDisplayName } from "../../users/utils";
import { useRouter } from "expo-router";
import { IUser } from "../../users/types";
import { chatsService } from "../services/chats";

export function ContactCard({
  contact
}: { contact: IUser }) {
  const router = useRouter();
  const navigateChat = async () => {
    const personalChat = await chatsService.getOrCreatePersonalChat(contact.id)
    router.push(`/chats/${personalChat.id}`);
  }
  return (
    <TouchableOpacity
      onPress={navigateChat}
      className="flex-row items-center gap-4 p-3 "
    >
      <UserAvatar
        user={contact}
        showIsOnline={false}
        className="w-12 h-12"
      />
      <Text className="text-base font-medium">
        {getUserDisplayName(contact)}
      </Text>
    </TouchableOpacity>
  );
}

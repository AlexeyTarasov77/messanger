import { Link, useRouter } from "expo-router";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Button,
} from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { verifyInstallation } from "nativewind";
import { Controller, useForm } from "react-hook-form";
import { IChatListSearch, IUsers } from "../types";
import { MessageCard } from "../components/message-card";

export function MessagesScreen() {
  verifyInstallation();
  const router = useRouter();
  const { handleSubmit, control, getValues, setError, formState: { errors } } = useForm<IChatListSearch>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
    },
  });
  async function onSubmit(data: IChatListSearch) {
    router.push({
      pathname: "/users/settings",
      params: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }
  return (
    <ScrollView>
      <View className="bg-white border border-gray-400 rounded-xl mt-3 mb-3 min-h-80">
        <View className="flex-row items-center m-5 gap-5">
          {/* justify-center  */}
          <View className="w-full gap-5">
            <View className="flex-row items-center gap-2">
              <ICONS.MessagesIcon width={20} height={20} fill="#81818D" />
              <Text className="color-grey dark:text-bgLight font-medium text-xl ">
                Повідомлення
              </Text>
            </View>

            <MessageCard
              user={{
                username: "Jane567_9",
                firstName: "Jane",
                lastName: "Cooper",
                isOnline: true,
                avatarUrl: "data:image/jpeg;base64,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"
              }}
              message="Привіт! Як справи ?"
              time="09:41"
            />

            <MessageCard
              user={{
                username: "Cameron_Williamson_21",
                firstName: "Cameron",
                lastName: "Williamson",
                isOnline: true,
                avatarUrl: ""
              }}
              message="Привіт! Як справи ?"
              time="09:41"
            />
            <Link href="/users/chats-list" asChild>
              <Button title="Go to chats list" />
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}


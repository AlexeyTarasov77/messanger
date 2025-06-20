import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Input } from "../../../shared/ui/input";
import { MessageCard } from "../components/message-card";
import { GroupCard } from "../components/group-card";

export function GroupMessagesScreen() {
    return (
        <View className="bg-mainBg h-full">
            <ScrollView className="bg-white border border-border rounded-xl mt-3 mb-3">
                <View className="flex-row items-center m-5 gap-5">
                    {/* justify-center  */}
                    <View className="w-full gap-5">
                        <View className="flex-row items-center gap-2">
                            <ICONS.MessagesIcon
                                width={20}
                                height={20}
                                fill="#81818D"
                            />
                            <Text className="color-grey dark:text-bgLight font-medium text-xl ">
                                Групові чати
                            </Text>
                        </View>

                        <GroupCard
                            participant="Mila"
                            message="Привіт! Як справи ?"
                            time="09:41"
                            name="New Group"
                        />
                         <GroupCard
                            participant="Mila"
                            message="Привіт! Як справи ?"
                            time="09:41"
                            name="New Group2"
                        />

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

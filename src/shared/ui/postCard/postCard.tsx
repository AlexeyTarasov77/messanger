import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Button } from "../button";
import { ICONS } from "../icons";

export function PostCard() {
    return (
        <View className="items-center justify-between p-2">
            <View className="flex-row items-center gap-5 justify-start">
                <View>
                    <Button.UserAvatarTypeOne />
                    <Text className="text-white dark:text-bgLight font-bold">X_AE_A-13</Text>
                </View>

                <View className="flex-row gap-2">
                    <TouchableOpacity className="">
                        {/* <ICONS.SettingsIcon width={30} height={30} /> */}
                    </TouchableOpacity>
                </View>
            </View>
            {/* className=" border-text border rounded-full p-2 flex-row gap-2 border-text justify-start border rounded-full p-2 " */}
        </View>
    );
}

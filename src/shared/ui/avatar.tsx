import { View, Image } from "react-native";

export function Avatar() {
    return (
        <View className=" border-white border dark:border-border rounded-full p-2 ">
            <Image
                className="rounded-full h-[88] w-[88]"
                source={require("../../modules/users/assets/avatar.jpg")}
            ></Image>
        </View>
    );
}

import { View } from "react-native";
import { AllFriends } from "../../../modules/friends/screens";

export default function AllFriendsRoute() {
    return (
        <View className="bg-mainBg h-full pb-10">
            <AllFriends />
        </View>
    );
}

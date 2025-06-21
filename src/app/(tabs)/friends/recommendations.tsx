import { View } from "react-native";
import { Recommendations } from "../../../modules/friends/screens";

export default function RecommendationsRoute() {
  return (
    <View className="bg-mainBg h-full pb-10">
      <Recommendations showAll={true} />
    </View>
  );
}

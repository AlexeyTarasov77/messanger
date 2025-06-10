import { ScrollView } from "react-native";
import { Requests } from "./requests";
import { Recommendations } from "./recommendations";
import { AllFriends } from "./all-friends";

export function Main() {
  return (
    <ScrollView className="bg-mainBg flex-1">
      <Requests />
      <Recommendations />
      <AllFriends />
    </ScrollView>
  );
}

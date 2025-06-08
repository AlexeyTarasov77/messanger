import { View } from "react-native";
import { ProfileCardBlock } from "./profile-card-block";
import { MainBlock } from "./main-block";
import { SignatureOptionsBlock } from "./sig-options-block";

export function Layout() {
  return (
    <View className="gap-2">
      <ProfileCardBlock />
      <MainBlock />
      <SignatureOptionsBlock />
    </View>
  );
}

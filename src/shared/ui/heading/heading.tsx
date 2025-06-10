import { ReactNode } from "react";
import { Text, View } from "react-native";

export function Heading({ label, action }: { label: string, action?: ReactNode }) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-darkBlue text-lg w-1/2 font-medium flex-1">{label}</Text>
      {action}
    </View>
  )
}

import { View, ViewProps } from "react-native";

interface SomeComponentsProps {
  ...
}

export function SomeComponent({ prop1, prop2, ...props }: { prop1: string, prop2: number } & ViewProps) {
  return (
    <View {...props}></View>
  )
}

/chats/

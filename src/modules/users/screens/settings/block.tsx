import { ReactNode } from "react";
import { View } from "react-native";

export const Block = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <View className={`bg-white p-4 rounded-xl border-border gap-4 ${className}`}>
      {children}
    </View>
  );
};

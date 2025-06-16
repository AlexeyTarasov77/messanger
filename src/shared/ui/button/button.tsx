import { TouchableOpacity, Text } from "react-native";
import { IButtonProps, IRoundedButtonProps } from "./button.types";

export function Button(props: IButtonProps) {
  const { label, disabled, ...touchableOpacityProps } = props;
  return (
    <TouchableOpacity {...touchableOpacityProps} disabled={disabled}>
      <Text className="self-center text-white text-xl font-bold">{label}</Text>
    </TouchableOpacity>
  );
}

export function RoundedButton({ label, disabled, filled, className, icon, ...props }: IRoundedButtonProps) {
  return (
    <TouchableOpacity
      className={`flex-row gap-2 rounded-full border border-slive p-3 items-center justify-center ${className} ${filled ? "bg-purple-100" : ""}`}
      {...props} disabled={disabled}
    >
      {icon}
      {label &&
        <Text className="text-slive text-lg">{label}</Text>
      }
    </TouchableOpacity>
  )
}

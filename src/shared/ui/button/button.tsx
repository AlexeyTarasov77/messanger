import { TouchableOpacity, Text } from "react-native";
import { IButtonProps, IRoundedButtonProps } from "./button.types";
import clsx from "clsx";

export function Button(props: IButtonProps) {
  const { label, disabled, ...touchableOpacityProps } = props;
  return (
    <TouchableOpacity {...touchableOpacityProps} disabled={disabled}>
      <Text className="self-center text-white text-xl font-bold">{label}</Text>
    </TouchableOpacity>
  );
}

export function RoundedButton({ label, disabled, filled, className, icon, darkFill, ...props }: IRoundedButtonProps) {
  return (
    <TouchableOpacity
      className={clsx("flex-row gap-2 rounded-full border border-slive p-3 items-center justify-center", filled && (darkFill ? "bg-slive" : "bg-purple-100"), className)}
      {...props} disabled={disabled}
    >
      {icon}
      {label &&
        <Text className={clsx("text-lg", darkFill ? "text-white" : "text-slive")}>{label}</Text>
      }
    </TouchableOpacity>
  )
}

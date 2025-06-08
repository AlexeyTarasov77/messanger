import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";

export interface IButtonProps extends TouchableOpacityProps {
  label?: string;
  disabled?: boolean;
}

export interface IRoundedButtonProps extends IButtonProps {
  icon?: ReactNode;
  filled?: boolean;
}

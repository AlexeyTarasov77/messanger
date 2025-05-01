import { ReactNode } from "react";
import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface IInputProps extends TextInputProps {
    iconLeft?: ReactNode,
    iconRight?: ReactNode,
    inputStyles?: TextStyle,
    containerStyles?: ViewStyle
    errMsg?: string;
    label?: string
}


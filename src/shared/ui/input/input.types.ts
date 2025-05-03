import { ReactNode } from "react";
import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface IInputProps extends TextInputProps {
    iconLeft?: ReactNode,
    iconRight?: ReactNode,
    errMsg?: string;
    label?: string
}


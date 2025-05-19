import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export interface IInputProps extends TextInputProps {
    iconRight?: ReactNode,
    errMsg?: string;
    label?: string
}


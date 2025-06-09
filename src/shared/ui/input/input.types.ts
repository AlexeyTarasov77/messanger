import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { TextInputProps } from "react-native";

export interface IInputProps extends TextInputProps {
  iconRight?: ReactNode;
  err?: FieldError;
  label?: string;
}

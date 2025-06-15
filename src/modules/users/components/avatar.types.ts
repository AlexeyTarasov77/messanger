import { TextInputProps } from "react-native";

export interface IUserAvatarProps extends TextInputProps {
    avatarUrl?: string;
    isOnline: boolean;
}
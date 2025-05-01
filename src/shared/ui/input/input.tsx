import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { IInputProps } from "./input.types";
import { ICONS } from "../icons";
import { useState } from "react";

function Input({
    label,
    errMsg,
    iconLeft,
    iconRight,

    ...props
}: IInputProps) {
    return (
        <View>
            {label && <Text className="text-white dark:text-bgLight">{label}</Text>}
            <View className="flex-row bg-bgLight dark:bg-bgDark rounded-xl px-2">
                {iconLeft && (
                    <View className="mr-2 self-center">{iconLeft}</View>
                )}
                <TextInput placeholderTextColor="#CDCDCD"{...props} />
                {iconRight && (
                    <View style={{ marginLeft: "auto" }}>{iconRight}</View>
                )}
            </View>
            {errMsg && (
                <View>
                    <Text>{errMsg}</Text>
                </View>
            )}
        </View>
    );
}

function Password(props: Omit<IInputProps, "iconLeft" | "iconRight">) {
    const { label, errMsg } = props;
    const [isHidden, setIsHidden] = useState(true);

    return (
        <View>
            {label && <Text className="text-white dark:text-bgLight">{label}</Text>}
            <View className="flex-row bg-bgLight dark:bg-bgDark rounded-xl px-2">
                <View className="mr-2 self-center">
                    <ICONS.KeyIcon width={30} height={30} />
                </View>
                <TextInput placeholderTextColor="#CDCDCD" secureTextEntry={isHidden} {...props} />
                <View className="ml-auto self-center">
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setIsHidden(!isHidden);
                        }}
                    >
                        {isHidden ? (
                            <ICONS.EyeIcon width={30} height={30} />
                        ) : (
                            <ICONS.EyeSlashIcon width={30} height={30} />
                        )}
                    </TouchableWithoutFeedback>
                </View>
            </View>
            {errMsg && (
                <View>
                    <Text>{errMsg}</Text>
                </View>
            )}
        </View>
    );
}

Input.Password = Password;

export { Input };

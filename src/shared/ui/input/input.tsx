import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { IInputProps } from "./input.types";
import { ICONS } from "../icons";
import { useState } from "react";
import { renderError } from "../../utils/errors";

export function Input({
    label,
    err,
    iconRight,

    ...props
}: IInputProps) {
    return (
        <View>
            {label && <Text className="text-black">{label}</Text>}
            <View className="flex-row rounded-2xl px-2 border border-grey">
                <TextInput placeholderTextColor="#CDCDCD" {...props} />
                {iconRight && (
                    <View style={{ marginLeft: "auto" }}>{iconRight}</View>
                )}
            </View>
            {renderError(err)}
        </View>
    );
}

function Password(props: Omit<IInputProps, "iconRight">) {
    const { label, err } = props;
    const [isHidden, setIsHidden] = useState(true);

    return (
        <View>
            {label && <Text className="text-dark">{label}</Text>}
            <View className="flex-row rounded-2xl border border-grey px-2">
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
            {renderError(err)}
        </View>
    );
}

Input.Password = Password;

// function Comment(props: Omit<IInputProps, "iconLeft" | "iconRight">) {
//     const { label, errMsg } = props;
//     const [isHidden, setIsHidden] = useState(true);

//     return (
//         <View>
//             {label && <Text className="text-white dark:text-bgLight">{label}</Text>}

//             <GradientBorder borderRadius={20} borderWidth={3} style={{ padding: 0 }}>
//                 <View className="flex-row bg-bgLight dark:bg-bgDark rounded-xl px-2">
//                     <View className="mr-2 self-center">
//                         <ICONS.KeyIcon width={30} height={30} />
//                     </View>
//                     <TextInput placeholderTextColor="#CDCDCD" style={{ color: "#FFFFFF", }} secureTextEntry={isHidden} {...props} />
//                 </View>
//             </GradientBorder>
//             {
//                 errMsg && (
//                     <View>
//                         <Text>{errMsg}</Text>
//                     </View>
//                 )
//             }
//         </View >
//     );
// }

// Input.Comment = Comment;

import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { IInputProps } from "./input.types";
import { ICONS } from "../icons";
import { useState } from "react";
import { renderError } from "../../utils/errors";

// export function Input({
//   label,
//   err,
//   iconRight,
//   disabled,
//   className,
//   ...props
// }: IInputProps) {
//   return (
//     <View>
//       {!!label && (
//         <Text className={disabled ? "text-gray-400" : "text-black"}>
//           {label}
//         </Text>
//       )}
//       <View
//         className={`flex-row rounded-xl px-3 py-3 border ${disabled ? "border-gray-400" : "border-grey"} ${className}`}
//       >
//         <TextInput
//           placeholderTextColor="#CDCDCD"
//           {...props}
//           className={`w-full  ${disabled ? "text-gray-400" : " "} `}
//           readOnly={disabled}
//         />
//         {iconRight && <View style={{ marginLeft: "auto" }}>{iconRight}</View>}
//       </View>
//       {renderError(err)}
//     </View>
//   );
// }

export function Input({
    label,
    err,
    iconRight,
    disabled,
    className,
    ...props
}: IInputProps) {
    return (
        <View>
            {!!label && (
                <Text className={disabled ? "text-gray-400" : "text-black"}>
                    {label}
                </Text>
            )}
            <View
                className={`flex-row rounded-xl px-2 border items-center ${disabled ? "border-gray-400" : "border-grey"
                    } `}

            // className={`flex-row rounded-xl px-3 py-3 border ${disabled ? "border-gray-400" : "border-grey"} ${className}`}
            >
                <TextInput
                    placeholderTextColor="#CDCDCD"
                    {...props}
                    className={`py-2 ${className} w-full ${disabled ? "text-gray-400" : " "
                        }`}
                    //   editable={!disabled}
                    readOnly={disabled}
                />

                {iconRight && (
                    <View style={{ marginLeft: "auto" }}>{iconRight}</View>
                )}
            </View>
            {renderError(err)}
        </View>
    );
}

// import { TextInput, View,TouchableWithoutFeedback, Text } from "react-native";
// // import { styled } from "nativewind";

// export function Input({
//   label,
//   err,
//   iconRight,
//   disabled,
//   className,
//   ...props
// }: IInputProps) {
//   return (
//     <View className="w-full">
//       {!!label && (
//         <Text className={`mb-1 ${disabled ? "text-gray-400" : "text-black"}`}>
//           {label}
//         </Text>
//       )}
//       <View
//         className={`flex-row items-center rounded-xl px-3 py-3 border ${
//           disabled ? "border-gray-400" : "border-grey"
//         } ${className}`}
//       >
//         <TextInput
//           className={`flex-1 text-base ${
//             disabled ? "text-gray-400" : "text-black"
//           }`}
//           placeholderTextColor="#CDCDCD"
//           editable={!disabled}
//           {...props}
//         />
//         {iconRight && <View className="ml-auto">{iconRight}</View>}
//       </View>
//       {renderError(err)}
//     </View>
//   );
// }

function InputSearch(props: Omit<IInputProps, "iconLeft">) {
    const { err } = props;
    return (
        <View className="">
            <View className="flex-row gap-1 items-center rounded-2xl px-2 border border-grey">
                <View className=" self-center">
                    <ICONS.SearchIcon svg={{ width: 20, height: 20 }} />
                </View>
                <TextInput placeholderTextColor="#81818D" {...props} />
            </View>
            {renderError(err)}
        </View>
    );
}

Input.InputSearch = InputSearch;

function Password(props: Omit<IInputProps, "iconRight">) {
    const { label, err, disabled, className } = props;
    const [isHidden, setIsHidden] = useState(true);

    return (
        <View>
            {!!label && (
                <Text className={disabled ? "text-gray-400" : "text-black"}>
                    {label}
                </Text>
            )}
            <View
                className={`flex-row rounded-2xl border border-grey px-2 pl-2 ${disabled ? "border-gray-400" : "border-grey"
                    }`}
            >
                <TextInput
                    className={`${className} w-4/5 ${disabled ? "text-gray-400" : " "
                        }`}
                    placeholderTextColor="#CDCDCD"
                    secureTextEntry={isHidden}
                    {...props}
                    readOnly={disabled}
                />
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

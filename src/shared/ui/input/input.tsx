import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { IInputProps } from "./input.types";
import { ICONS } from "../icons";
import { useState } from "react";
import { renderError } from "../../utils/errors";


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
        className={`flex-row rounded-xl px-4 py-2 border ${disabled ? "border-gray-400" : "border-grey"} ${className}`}
      >
        <TextInput
          placeholderTextColor="#CDCDCD"
          {...props}
          className={`w-full  ${disabled ? "text-gray-400" : " "} `}
          readOnly={disabled}
        />
        {iconRight && <View style={{ marginLeft: "auto" }}>{iconRight}</View>}
      </View>
      {renderError(err)}
    </View>
  );
}
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
  const { label, err } = props;
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View>
      {!!label && <Text className="text-dark">{label}</Text>}
      <View className="flex-row rounded-2xl border border-grey px-2 pl-2">
        <TextInput
          placeholderTextColor="#CDCDCD"
          secureTextEntry={isHidden}
          {...props}
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

import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { IInputProps } from "./input.types";
import { ICONS } from "../icons";
import { useState } from "react";

function Input({
	label,
	errMsg,
	iconLeft,
	iconRight,
	inputStyles,
	containerStyles,
	...props
}: IInputProps) {
	return (
		<View>
			{label && <Text >{label}</Text>}
            {/* style={[styles.inputBox, containerStyles]} */}
			<View >
				{iconLeft && <View style={{ marginRight: 2 }}>{iconLeft}</View>}
                {/* style={[inputStyles, styles.input]} */}
				<TextInput  {...props} />
				{iconRight && (
					<View style={{ marginLeft: "auto" }}>{iconRight}</View>
				)}
			</View>
			{errMsg && (
				<View>
					{/* <ICONS.ErrorIcon width={16} height={16} /> */}
					<Text>{errMsg}</Text>
				</View>
			)}
		</View>
	);
}

function Password(props: Omit<IInputProps, "iconLeft" | "iconRight">) {
	const { label, inputStyles, containerStyles, errMsg } = props;
	const [isHidden, setIsHidden] = useState(true);

	return (
		<View>
			{label && <Text>{label}</Text>}
			<View>
				<View style={{ marginRight: 2 }}>
					<ICONS.KeyIcon width={30} height={30} />
				</View>
				<TextInput
					secureTextEntry={isHidden}
					// style={[inputStyles, styles.input]}
					{...props}
				/>
				<View style={{ marginLeft: "auto" }}>
					<TouchableWithoutFeedback
						onPress={() => {
							setIsHidden(!isHidden);
						}}
					>
						{isHidden ? (
							<ICONS.EyeSlashIcon width={30} height={30} />
						) : (
							<ICONS.EyeIcon width={30} height={30} />
						)}
					</TouchableWithoutFeedback>
				</View>
			</View>
			{errMsg && (
				<View>
					{/* <ICONS.ErrorIcon width={16} height={16} /> */}
					<Text>{errMsg}</Text>
				</View>
			)}
		</View>
	);
}

Input.Password = Password;

export { Input };
 
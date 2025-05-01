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
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={[styles.inputBox, containerStyles]}>
				{iconLeft && <View style={{ marginRight: 2 }}>{iconLeft}</View>}
				<TextInput style={[inputStyles, styles.input]} {...props} />
				{iconRight && (
					<View style={{ marginLeft: "auto" }}>{iconRight}</View>
				)}
			</View>
			{errMsg && (
				<View style={styles.errorBox}>
					<ICONS.ErrorIcon width={16} height={16} />
					<Text style={styles.errMsg}>{errMsg}</Text>
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
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={[styles.inputBox, containerStyles]}>
				<View style={{ marginRight: 2 }}>
					<ICONS.KeyIcon width={30} height={30} />
				</View>
				<TextInput
					secureTextEntry={isHidden}
					style={[inputStyles, styles.input]}
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
				<View style={styles.errorBox}>
					<ICONS.ErrorIcon width={16} height={16} />
					<Text style={styles.errMsg}>{errMsg}</Text>
				</View>
			)}
		</View>
	);
}

Input.Password = Password;

export { Input };
 
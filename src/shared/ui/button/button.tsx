import { TouchableOpacity, Text } from "react-native";
import { IButtonProps } from "./button.types"; 


export function Button(props: IButtonProps) {
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<TouchableOpacity
			{...touchableOpacityProps}
			disabled={disabled}
			// style={[disabled ? styles.disabled : null, styles.button]}
		>
			<Text>{label}</Text>
		</TouchableOpacity>
	);
}
// spread оператор

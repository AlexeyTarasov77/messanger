import { TouchableOpacity, Text } from "react-native";
import { IButtonProps } from "./button.types"; 


export function Button(props: IButtonProps) {
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<TouchableOpacity
			{...touchableOpacityProps}
			disabled={disabled}
		>
			<Text className="self-center text-white dark:text-bgLightOne text-xl font-bold">{label}</Text>
		</TouchableOpacity>
	);
}


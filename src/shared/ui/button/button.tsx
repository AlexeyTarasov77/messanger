import { TouchableOpacity, Text } from "react-native";
import { IButtonProps } from "./button.types";
import GradientBorder from '../gradientBorder/gradientBorder';


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

function Registr(props: IButtonProps) {
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<GradientBorder.Button borderRadius={20} borderWidth={3} style={{ padding: 0,}}>
			<TouchableOpacity
				{...touchableOpacityProps}
				disabled={disabled}
				style={{
					paddingVertical: 10,
					paddingHorizontal: 20,
					borderRadius: 17,
				}}
			>
				<Text className="self-center text-white dark:text-bgLightOne text-xl font-normal">{label}</Text>
			</TouchableOpacity>
		</GradientBorder.Button >
	);
}
Button.Registr = Registr

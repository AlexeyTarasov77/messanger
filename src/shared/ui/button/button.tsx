import { TouchableOpacity, Text, View, Image, FlatList } from "react-native";
import { IButtonProps } from "./button.types";
import GradientBorder from '../gradientBorder/gradientBorder';
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { posts } from "../../constants";

const defaultImage = require("../../../../assets/user-image.png");

export function Button(props: IButtonProps) {
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<TouchableOpacity
			{...touchableOpacityProps}
			disabled={disabled}
		>
			<Text className="self-center text-white dark:text-bgLight text-xl font-bold">{label}</Text>
		</TouchableOpacity>
	);
}

function Registr(props: IButtonProps) {
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<GradientBorder.Button borderRadius={20} borderWidth={3} style={{ padding: 0, }}>
			<TouchableOpacity
				{...touchableOpacityProps}
				disabled={disabled}
				style={{
					paddingVertical: 10,
					paddingHorizontal: 20,
					borderRadius: 17,
				}}
			>
				<Text className="self-center text-white dark:text-bgLight text-xl font-normal">{label}</Text>
			</TouchableOpacity>
		</GradientBorder.Button >
	);
}
Button.Registr = Registr

function UserAvatarTypeOne(props: IButtonProps) {
	const [image, setImage] = useState<string>("")
	async function onSearch() {
		const result = await requestMediaLibraryPermissionsAsync()
		if (result.status === "granted") {
			const images = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsEditing: true,
				allowsMultipleSelection: false,
				selectionLimit: 1,
				base64: false,
			});
			if (images.assets) {
				setImage(images.assets[0].uri)
			}
		} else {
		}
	}
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<GradientBorder.Button borderRadius={90} borderWidth={3} style={{ padding: 0, }}>
			<TouchableOpacity
				onPress={onSearch}
				{...touchableOpacityProps}
				disabled={disabled}
				style={{
					borderRadius: 60,
				}}>
				<View className="items-center justify-center"
				// style={{
				// 	alignItems: "center",
				// 	justifyContent: "center",
				// 	gap: 5,
				// }}
				>
					<View className="items-center justify-center p-5"
					// style={{
					// 	position: "relative",
					// 	width: 75,
					// 	height: 75,
					// }}
					>
						<Image
							source={image ? { uri: image } : defaultImage}
							className="w-32 h-32 "
							style={{ borderRadius: 60 }}
							resizeMode="cover"
						/>
					</View>
				</View>
			</TouchableOpacity>
		</GradientBorder.Button >
	);
}

Button.UserAvatarTypeOne = UserAvatarTypeOne

function UserAvatarTypeTwo(props: IButtonProps) {
	const [image, setImage] = useState<string>("")
	async function onSearch() {
		const result = await requestMediaLibraryPermissionsAsync()
		if (result.status === "granted") {
			const images = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsEditing: true,
				allowsMultipleSelection: false,
				selectionLimit: 1,
				base64: false,
			});
			if (images.assets) {
				setImage(images.assets[0].uri)
			}
		} else {
		}
	}
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<GradientBorder.Button borderRadius={90} borderWidth={3} style={{ padding: 0, }}>
			<TouchableOpacity
				onPress={onSearch}
				{...touchableOpacityProps}
				disabled={disabled}
				style={{
					borderRadius: 60,
				}}>

				<FlatList
					data={posts}
					renderItem={({ item }) => {
						return (
							<View className="items-center justify-center">
								<View className="items-center justify-center p-5">
									<Image
										source={{ uri: item.author.avatarUrl }}
										className="w-10 h-10"
									/>
								</View>
							</View>)
					}}
				/>

			</TouchableOpacity>
		</GradientBorder.Button >
	);
}

Button.UserAvatarTypeOne = UserAvatarTypeTwo
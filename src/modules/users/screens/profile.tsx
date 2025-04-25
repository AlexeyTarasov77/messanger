import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR_PALETTE } from "../../../shared/theme/colors";
import { useColorScheme } from "nativewind";
import MaskedView from "@react-native-masked-view/masked-view";

export function Profile() {
    const {colorScheme} = useColorScheme();
    const colors =
        colorScheme === "light"
            ? ([
                  COLOR_PALETTE.lightTheme.gradientColors.top,
                  COLOR_PALETTE.lightTheme.gradientColors.bottom,
              ] as const)
            : ([
                  COLOR_PALETTE.darkTheme.gradientColors.top,
                  COLOR_PALETTE.darkTheme.gradientColors.bottom,
              ] as const);
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            // className="flex-1 h-full"
        >
            <View>
                <Text className="text-white text-2xl font-semibold">Name</Text>
                <Text className="text-white text-2xl font-semibold">
                    У мережі
                </Text>
            </View>

            <View className="mt-4">
                {/* <MaskedView
                    maskElement={
                        <Text className="font-bold">Градиентный Текст</Text>
                    }
                >
                    <LinearGradient
                        colors={[COLOR_PALETTE.lightTheme.gradientColors.top, COLOR_PALETTE.lightTheme.gradientColors.bottom]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        // style={{ flex: 1 }}
                    />
                    <Text className="font-[10000]">fgdsacdvfb ghn</Text>
                </MaskedView> */}
                <View>
                    <Text className="text-white">Номер телефону</Text>
                    <Text className="text-white">+380-99-639-**-**</Text>
                </View>
                <View>
                    <Text className="text-white">Про себе</Text>
                    <Text className="text-white">Хз</Text>
                </View>
                <View>
                    <Text className="text-white">Ім'я користувача</Text>
                    <Text className="text-white">@mila_krutaja</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

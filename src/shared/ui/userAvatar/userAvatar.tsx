import { View, useColorScheme } from "react-native";
import { COLOR_PALETTE, colors, styles } from "../../../../../../Maria/vibenet-frontend/src/shared/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { UserIcon } from "../../../../../../Maria/vibenet-frontend/src/shared/ui/icons"

export function UserAvatar() {
  const colorScheme = useColorScheme()
    return (
        // <View className=" border-white border dark:border-border rounded-full p-2 ">
        // h-[88] w-[88]
            <View className="rounded-full w-20 h-20">
                <LinearGradient
                    colors={colors}
                    style={[
                        styles.linearGradientUser,
                        {
                            borderColor: colorScheme === 'light'
                                ? COLOR_PALETTE.lightTheme.border
                                : COLOR_PALETTE.darkTheme.border
                        },
                    ]}
                >
                    <UserIcon className="w-15 h-15" />
                </LinearGradient>
            </View>
    );
}

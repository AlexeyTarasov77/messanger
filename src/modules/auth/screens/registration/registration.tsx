import { useLocalSearchParams } from "expo-router"
import { Link, useRouter } from "expo-router"
import { Button, TextInput, ScrollView, TouchableOpacity, Text, View, useColorScheme } from "react-native"
import { UserIcon, PenIcon } from "../../../../shared/ui/icons"
import { LinearGradient } from "expo-linear-gradient";
import { verifyInstallation } from "nativewind";
import { COLOR_PALETTE } from "../../../../shared/theme/colors";

export function Registration() {
  const params = useLocalSearchParams()
  return (
    <ScrollView>
        <Text>Chat</Text>
    </ScrollView>
  )
}

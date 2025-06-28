import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";
import { SvgProps } from "react-native-svg";

export function MenuBtn({
  label,
  Icon,
  ...props
}: { label: string, Icon: (props: SvgProps) => React.JSX.Element } & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      className="w-full"
    >
      <View className="gap-2 flex-row items-center">
        <Icon width={20} height={20} />
        <Text className="text-lg">{label}</Text>
      </View>
    </TouchableOpacity>
  );
}


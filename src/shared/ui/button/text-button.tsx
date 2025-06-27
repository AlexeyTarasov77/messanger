import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

export function TextBtn({ label, Icon, ...btnProps }: { label: string, Icon?: React.FC<SvgProps> } & TouchableOpacityProps) {
  return (
    <TouchableOpacity {...btnProps} className="flex-row gap-2">
      {Icon &&
        <Icon stroke="#543C52" width={20} height={20} />
      }
      <Text className="text-slive text-lg">
        {label}
      </Text>
    </TouchableOpacity>
  )
}

import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

export function HomeIcon({ active, ...props }: SvgProps & { active?: boolean }) {
  return (
    <View className={active ? "border-t-2 border-slive" : ""}>
      <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <Path
          d="M15.133 6.625L9.072.564a1.515 1.515 0 00-2.143 0L.867 6.625a1.505 1.505 0 00-.444 1.072v7.274a.91.91 0 00.91.91h13.335a.91.91 0 00.909-.91V7.697a1.506 1.506 0 00-.444-1.072zm-1.374 7.437H2.242v-6.24L8 2.064l5.758 5.758v6.24z"
          fill="#070A1C"
          fillOpacity={1}
        />
      </Svg>
    </View>
  );
}

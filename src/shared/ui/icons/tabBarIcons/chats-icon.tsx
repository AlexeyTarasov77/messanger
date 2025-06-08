import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

export function ChatsIcon({
  active,
  ...props
}: SvgProps & { active?: boolean }) {
  return (
    <View className={active ? "border-t-2 border-slive" : ""}>
      <Svg width={17} height={18} viewBox="0 0 17 18" fill="none" {...props}>
        <Path
          d="M.985 9a7.515 7.515 0 0115.03 0v4.782c0 .796 0 1.193-.118 1.511a1.88 1.88 0 01-1.104 1.104c-.318.118-.716.118-1.511.118H8.5A7.515 7.515 0 01.985 9z"
          stroke="#070A1C"
          strokeWidth={1.66667}
          strokeOpacity={1}
        />
        <Path
          d="M5.682 8.06h5.636M8.5 11.819h2.818"
          stroke="#070A1C"
          strokeWidth={1.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={1}
        />
      </Svg>
    </View>
  );
}

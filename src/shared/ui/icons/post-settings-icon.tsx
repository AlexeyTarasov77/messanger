import { useColorScheme } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from "react-native-svg";

export function PostSettingsIcon(props: SvgProps) {
  const colorScheme = useColorScheme();
  if (colorScheme === "dark") {
    return (
      <Svg
        width={27}
        height={27}
        viewBox="0 0 6 18"
        fill="none"
        {...props}
      >
        <Path
          d="M5.188 9A2.187 2.187 0 11.813 9a2.187 2.187 0 014.375 0zM3 4.937A2.187 2.187 0 103 .564a2.187 2.187 0 000 4.375zm0 8.125a2.187 2.187 0 100 4.375 2.187 2.187 0 000-4.375z"
          fill="color(display-p3 .5059 .5059 .5529)"
          fillOpacity={1}

          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_119_61"
            x1={6.15267}
            y1={2.20305}
            x2={9.89205}
            y2={27.8349}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#77B5BF" />
            <Stop offset={1} stopColor="#7D88AA" />
          </LinearGradient>
        </Defs>
      </Svg>
    )
  } else {
    return (
      <Svg
        width={27}
        height={27}
        viewBox="0 0 6 18"
        fill="none"
        {...props}
      >
        <Path
          d="M5.188 9A2.187 2.187 0 11.813 9a2.187 2.187 0 014.375 0zM3 4.937A2.187 2.187 0 103 .564a2.187 2.187 0 000 4.375zm0 8.125a2.187 2.187 0 100 4.375 2.187 2.187 0 000-4.375z"
          fill="color(display-p3 .5059 .5059 .5529)"
          fillOpacity={1}

          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }

}
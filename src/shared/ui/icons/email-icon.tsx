import { useColorScheme } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

export function EmailIcon(props: SvgProps) {
  const colorScheme = useColorScheme();
  if (colorScheme === "dark") {
    return (
      <Svg
        width={28}
        height={22}
        viewBox="0 0 28 22"
        fill="none"
        {...props}
      >
        <Path
          d="M26.5 3.5C26.5 2.125 25.375 1 24 1H4a2.507 2.507 0 00-2.5 2.5m25 0v15c0 1.375-1.125 2.5-2.5 2.5H4a2.507 2.507 0 01-2.5-2.5v-15m25 0L14 12.25 1.5 3.5"
          stroke="url(#paint0_linear_123_110)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_123_110"
            x1={6.65267}
            y1={1.96244}
            x2={9.06396}
            y2={22.6229}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#77B5BF" />
            <Stop offset={1} stopColor="#7D88AA" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  } else {
    return (
      <Svg
        width={28}
        height={22}
        viewBox="0 0 28 22"
        fill="none"
        {...props}
      >
        <Path
          d="M26.5 3.5C26.5 2.125 25.375 1 24 1H4a2.507 2.507 0 00-2.5 2.5m25 0v15c0 1.375-1.125 2.5-2.5 2.5H4a2.507 2.507 0 01-2.5-2.5v-15m25 0L14 12.25 1.5 3.5"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
}

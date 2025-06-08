import Svg, { Path, SvgProps } from "react-native-svg";

export function BinIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 21 20" fill="none" {...props}>
      <Path
        d="M3.969 5.833h13.333M8.97 9.167v5m3.333-5v5m-7.5-8.334l.833 10A1.666 1.666 0 007.302 17.5h6.667a1.667 1.667 0 001.666-1.667l.834-10m-8.334 0v-2.5A.833.833 0 018.97 2.5h3.333a.833.833 0 01.833.833v2.5"
        stroke="#543C52"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  );
}

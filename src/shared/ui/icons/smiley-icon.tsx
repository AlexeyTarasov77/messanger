import Svg, { Path, SvgProps } from "react-native-svg";

export function SmileyIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666z"
        stroke="#543C52"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.667 11.667s1.25 1.666 3.333 1.666 3.333-1.666 3.333-1.666M7.5 7.5h.008M12.5 7.5h.008"
        stroke="#543C52"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

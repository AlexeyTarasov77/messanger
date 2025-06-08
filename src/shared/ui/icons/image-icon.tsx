import Svg, { Path, SvgProps } from "react-native-svg";

export function ImageIcon(props: SvgProps) {
  return (
    <Svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
      <Path
        d="M16.256 2.5H4.589c-.92 0-1.667.746-1.667 1.667v11.666c0 .92.747 1.667 1.667 1.667h11.667c.92 0 1.666-.746 1.666-1.667V4.167c0-.92-.746-1.667-1.666-1.667z"
        stroke="#543C52"
      />
      <Path
        d="M7.506 8.333a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM17.922 12.5l-4.166-4.167L4.589 17.5"
        stroke="#543C52"
      />
    </Svg>
  );
}

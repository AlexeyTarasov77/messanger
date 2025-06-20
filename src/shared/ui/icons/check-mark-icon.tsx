import Svg, {
    Path,
    SvgProps,
} from "react-native-svg";

export function CheckMarkIcon(props: SvgProps) {
    return (
    <Svg
      width={19}
      height={14}
      viewBox="0 0 19 14"
      fill="none"
      {...props}
    >
      <Path
        d="M17.053 1.302l-11 11-5-5"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    )
}



import Svg, { Path, SvgProps } from "react-native-svg";

export function PenIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 33 33"
      {...props}
    >
      <Path
        d="M22.806 4.142L3.77 23.179 1.5 31.5l8.321-2.27 19.037-19.036m-6.052-6.052l1.389-1.389a4.28 4.28 0 116.052 6.052l-1.389 1.389m-6.052-6.052l6.052 6.052"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


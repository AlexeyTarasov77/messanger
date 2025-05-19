import Svg, { Rect, SvgProps } from "react-native-svg"

export function OfflineIcon(props: SvgProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"

      {...props}
    >
      <Rect
        x={1.875}
        y={1.875}
        width={14.25}
        height={14.25}
        rx={7.125}
        fill="#CDCED2"
        fillOpacity={1}
      />
      <Rect
        x={1.875}
        y={1.875}
        width={14.25}
        height={14.25}
        rx={7.125}
        stroke="#fff"
        strokeWidth={2.25}
        strokeOpacity={1}
      />
    </Svg>
  )
}
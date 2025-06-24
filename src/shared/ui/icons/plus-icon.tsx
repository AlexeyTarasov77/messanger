import Svg, { Path, SvgProps } from "react-native-svg"

export function PlusForPostIcon(props:SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M13.336 8.81H9.279v4.057a.811.811 0 01-1.622 0V8.81H3.6a.811.811 0 110-1.622h4.057V3.13a.811.811 0 111.622 0v4.057h4.057a.811.811 0 010 1.622z"
        fillOpacity={1}
      />
    </Svg>
  )
}
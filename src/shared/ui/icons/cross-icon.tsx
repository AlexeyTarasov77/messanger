import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

export function CrossIcon(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"

      {...props}
    >
      <G clipPath="url(#clip0_9015_974)">
        <Path
          d="M10.868 12.014L8 9.146l-2.868 2.868a.811.811 0 11-1.148-1.147L6.853 8 3.984 5.13a.811.811 0 011.148-1.147L8 6.851l2.868-2.868a.811.811 0 111.148 1.147L9.147 8l2.869 2.868a.811.811 0 11-1.148 1.147z"
          fillOpacity={1}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_9015_974">
          <Path

            transform="translate(.5 .5)"
            d="M0 0H15V15H0z"
            fillOpacity={1}
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
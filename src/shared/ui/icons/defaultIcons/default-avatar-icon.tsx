import Svg, { Circle, Path, SvgProps } from "react-native-svg"

export function DEFAULT_AVATAR_ICON(props: SvgProps) {
  return (
    <Svg
    //   width={46}
    //   height={46}
      viewBox="0 0 46 46"
      fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={23}
        cy={23}
        r={23}
        fill="#543C52"
        fillOpacity={1}
      />
      <Path
        d="M14.35 29.178v-11.2h1.936l4.432 8.128v-8.128h1.76v11.2h-1.936L16.11 21.05v8.128h-1.76zm14.5-11.2c1.12 0 2.037.368 2.752 1.104.725.736 1.088 1.675 1.088 2.816 0 1.142-.363 2.08-1.088 2.816-.715.736-1.632 1.104-2.752 1.104h-2.288v3.36h-1.84v-11.2h4.128zm-.112 6.192c.608 0 1.109-.213 1.504-.64.405-.437.608-.981.608-1.632 0-.65-.203-1.19-.608-1.616-.395-.437-.896-.656-1.504-.656h-2.176v4.544h2.176z"
        fill="#fff"
        fillOpacity={1}
      />
    </Svg>
  )
}
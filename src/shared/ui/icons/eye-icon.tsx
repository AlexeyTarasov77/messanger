import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export function EyeIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <G
        clipPath="url(#clip0_55_2723)"
        stroke="#81818D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M1.667 10S4.167 4.167 10 4.167 18.333 10 18.333 10s-2.5 5.833-8.333 5.833S1.667 10 1.667 10z"
          stroke="#81818D"
          strokeOpacity={1}
        />
        <Path
          d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
          stroke="#81818D"
          strokeOpacity={1}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_55_2723">
          <Path fill="#fff" d="M0 0H20V20H0z" fillOpacity={1} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

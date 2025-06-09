import Svg, { Path, SvgProps } from "react-native-svg";

export function PlusIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M14.96 9.08H9.552v5.409a1.082 1.082 0 11-2.164 0V9.08H1.98a1.082 1.082 0 010-2.163h5.408V1.508a1.082 1.082 0 012.164 0v5.409h5.408a1.082 1.082 0 110 2.163z"
        fill="#543B52"
        fillOpacity={1}
      />
    </Svg>
  );
}

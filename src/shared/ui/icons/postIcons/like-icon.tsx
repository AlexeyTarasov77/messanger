import { useColorScheme } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from "react-native-svg";

export function LikeIcon(props: SvgProps) {
 
    return (
      <Svg
        width={27}
        height={27}
      viewBox="0 0 20 18"
        fill="none"
        {...props}
      >
        <Path
        d="M18.516 5.99a2.187 2.187 0 00-1.64-.74h-4.063v-.938A3.441 3.441 0 009.375.876a.938.938 0 00-.838.518L5.671 7.125H2.5A1.563 1.563 0 00.937 8.688v6.874A1.563 1.563 0 002.5 17.125h13.438a2.188 2.188 0 002.17-1.916l.938-7.5a2.187 2.187 0 00-.53-1.72zM2.813 9h2.5v6.25h-2.5V9zm14.375-1.523l-.938 7.5a.313.313 0 01-.312.273h-8.75V8.284l2.72-5.44a1.562 1.562 0 011.03 1.469v1.875a.938.938 0 00.938.937h5a.312.312 0 01.312.352z"
          fill="#81818D"
          fillOpacity={1}

          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }


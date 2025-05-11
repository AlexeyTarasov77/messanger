import Svg, { Path, SvgProps } from "react-native-svg";

export function PostSettingsIcon(props: SvgProps) {
    return (
        <Svg width={27} height={27} viewBox="0 0 6 18" fill="none" {...props}>
            <Path
                d="M5.188 9A2.187 2.187 0 11.813 9a2.187 2.187 0 014.375 0zM3 4.937A2.187 2.187 0 103 .564a2.187 2.187 0 000 4.375zm0 8.125a2.187 2.187 0 100 4.375 2.187 2.187 0 000-4.375z"
                fill="#81818D"
                fillOpacity={1}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

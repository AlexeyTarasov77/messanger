import Svg, { Path, SvgProps } from "react-native-svg";

export function EmailIcon(props: SvgProps) {
    return (
        <Svg width={28} height={22} viewBox="0 0 28 22" fill="none" {...props}>
            <Path
                d="M26.5 3.5C26.5 2.125 25.375 1 24 1H4a2.507 2.507 0 00-2.5 2.5m25 0v15c0 1.375-1.125 2.5-2.5 2.5H4a2.507 2.507 0 01-2.5-2.5v-15m25 0L14 12.25 1.5 3.5"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

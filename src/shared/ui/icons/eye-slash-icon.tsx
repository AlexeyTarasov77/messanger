import Svg, { Path, SvgProps, G, Defs, ClipPath } from "react-native-svg";

export function EyeSlashIcon(props: SvgProps) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <G clipPath="url(#clip0_1022_1058)">
                <Path
                    d="M8.233 8.233a2.5 2.5 0 103.534 3.534M8.942 4.233A8.692 8.692 0 0110 4.167c5.833 0 8.333 5.833 8.333 5.833a10.97 10.97 0 01-1.391 2.233M5.508 5.508A11.272 11.272 0 001.667 10s2.5 5.833 8.333 5.833a8.116 8.116 0 004.492-1.341M1.667 1.667l16.666 16.666"
                    stroke="#81818D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity={1}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_1022_1058">
                    <Path fill="#fff" d="M0 0H20V20H0z" fillOpacity={1} />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

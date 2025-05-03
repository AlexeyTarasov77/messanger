import { useColorScheme } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from "react-native-svg";

export function PhoneNumberIcon(props: SvgProps) {
    const colorScheme = useColorScheme();
    if (colorScheme === "dark") {
        return (
            <Svg
                width={26}
                height={26}
                viewBox="0 0 26 26"
                fill="none"
                {...props}
            >
                <Path
                    d="M26 19.717v3.764a2.506 2.506 0 01-1.71 2.387 2.519 2.519 0 01-1.031.122 24.906 24.906 0 01-10.848-3.851 24.487 24.487 0 01-7.542-7.527A24.795 24.795 0 011.01 3.734a2.504 2.504 0 011.488-2.521c.32-.14.665-.214 1.014-.214h3.77a2.517 2.517 0 012.515 2.158 16.08 16.08 0 00.88 3.525 2.505 2.505 0 01-.566 2.647l-1.597 1.593a20.093 20.093 0 007.542 7.527l1.597-1.593a2.516 2.516 0 012.652-.564c1.14.424 2.325.719 3.532.878A2.515 2.515 0 0126 19.717z"
                    fill="none"
                    stroke={"url(#strokeGradient)"}
                    strokeWidth={2}
                />
                <Defs>
                    <LinearGradient
                        id="strokeGradient"
                        x1={5.65267}
                        y1={1.70305}
                        x2={9.39205}
                        y2={27.3349}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopColor="#77B5BF" />
                        <Stop offset={1} stopColor="#7D88AA" />
                    </LinearGradient>
                </Defs>
            </Svg>
        )
    } else {
        return (
            <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
                <Path
                    d="M26 19.717v3.764a2.506 2.506 0 01-1.71 2.387 2.519 2.519 0 01-1.031.122 24.906 24.906 0 01-10.848-3.851 24.487 24.487 0 01-7.542-7.527A24.795 24.795 0 011.01 3.734a2.504 2.504 0 011.488-2.521c.32-.14.665-.214 1.014-.214h3.77a2.517 2.517 0 012.515 2.158 16.08 16.08 0 00.88 3.525 2.505 2.505 0 01-.566 2.647l-1.597 1.593a20.093 20.093 0 007.542 7.527l1.597-1.593a2.516 2.516 0 012.652-.564c1.14.424 2.325.719 3.532.878A2.515 2.515 0 0126 19.717z"
                    fill="#fff"
                    strokeWidth={2}
                />
            </Svg>
        )
    }
}

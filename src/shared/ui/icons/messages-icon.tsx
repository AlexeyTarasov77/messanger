import Svg, { Path, SvgProps, Mask } from "react-native-svg";

export function MessagesIcon(props: SvgProps) {
    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            {...props}
        >
            <Mask
                id="a"
                fill="black"
                stroke="#e6e6fa"
                strokeWidth={3}>
                <Path
                    d="M0 7.515C0 3.373 3.373 0 7.515 0c4.142 0 7.515 3.358 7.515 7.5v6.53a1 1 0 01-1 1H7.5c-4.142 0-7.5-3.373-7.5-7.515z"
                />
            </Mask>
            <Path
                d="M0 7.515C0 3.373 3.373 0 7.515 0v0c4.142 0 7.515 3.358 7.515 7.5v6.53a1 1 0 01-1 1H7.5c-4.142 0-7.5-3.373-7.5-7.515v0z"
                stroke="##81818D"
                strokeWidth={3.34}
                mask="url(#a)"
            />
            <Path
                d="M5 6h5M7 10h3"
                stroke="#81818D"
                strokeWidth={1.67}
                strokeLinecap="round"
            />
        </Svg>
    );
}



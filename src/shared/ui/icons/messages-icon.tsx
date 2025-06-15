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


// export function MessagesIcon(props: SvgProps) {
//     return (
//         <Svg
//             viewBox="0 0 18 18"
//             fill="none"
//             {...props}
//         >
//             <Path
//                 d="M1.148 9a7.515 7.515 0 1115.03 0v4.782c0 .796 0 1.193-.118 1.511a1.879 1.879 0 01-1.103 1.104c-.319.118-.716.118-1.512.118H8.664A7.515 7.515 0 011.148 9z"
//                 // stroke="color(display-p3 .0275 .0392 .1098)"
//                 strokeWidth={2}
//                 strokeOpacity={1}
//             />
//             <Path
//                 d="M5.844 8.06h5.636m-2.818 3.758h2.818"
//                 // stroke="color(display-p3 .0275 .0392 .1098)"
//                 strokeWidth={2}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeOpacity={1}
//             />
//         </Svg>
//     );
// }

import Svg, { Path, SvgProps } from "react-native-svg";

export function UserIcon(props: SvgProps) {
  return (
    <Svg width={27} height={27} viewBox="0 0 27 27" fill="none" {...props}>
      <Path
        d="M1 26c.038-3.253.645-4.915 4.687-7.07 2.535-.445 4.053-.655 7.543-.706 3.121.043 4.678.254 7.299.706 4.23 1.96 5.543 3.46 5.468 7.07M19.479 6.656c0 3.123-2.798 5.655-6.25 5.655-3.45 0-6.249-2.532-6.249-5.655C6.98 3.532 9.778 1 13.23 1c3.45 0 6.249 2.532 6.249 5.656z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

import { useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Dimensions, View } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
  TCarouselProps,
} from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

export function UICarousel<T extends {}>(props: Omit<TCarouselProps<T>, "width" | "height" | "ref">) {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        onProgressChange={progress}
        {...props as any}
      />

      <Pagination.Basic<T>
        progress={progress}
        data={props.data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { THEME_STORAGE_KEY } from "../../../../shared/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"

export function useSetup() {
  const { setColorScheme } = useColorScheme();
  useEffect(() => {
    const setTheme = async () => {
      const selectedTheme = (await AsyncStorage.getItem(
        THEME_STORAGE_KEY,
      )) as ReturnType<typeof useColorScheme>["colorScheme"];
      setColorScheme(selectedTheme || "system");
    };
    setTheme();
    dayjs.extend(customParseFormat);
  });
}

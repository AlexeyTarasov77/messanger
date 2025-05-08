import { useColorScheme } from "react-native"
import { StyleSheet } from 'react-native';

export const COLOR_PALETTE = {
  lightTheme: {
    gradientColors: {
      top: "#77B5BF",
      bottom: "#7D88AA",
    },
    border: "#77B5BF",
    text: "#FFFFFF",
    background: "#E6F1F5",
    shadowColor: "#77B5BF",
  },
  darkTheme: {
    gradientColors: {
      top: "#3E4148",
      bottom: "#1B1E25",
    },

    border: "#3E4148",
    text: "#FFFFFF",
    textNext: "#FFFFFF",
    background: "#1B1E25",
    shadowColor: "#77B5BF",
  },
}

export function useColors() {
  const colorScheme = useColorScheme();
  return colorScheme === "light"
  ? ([
    COLOR_PALETTE.lightTheme.gradientColors.top,
    COLOR_PALETTE.lightTheme.gradientColors.bottom,
    COLOR_PALETTE.lightTheme.border,
    COLOR_PALETTE.lightTheme.text,
    COLOR_PALETTE.lightTheme.background,
    COLOR_PALETTE.lightTheme.shadowColor,
  ] as const)
  : ([
    COLOR_PALETTE.darkTheme.gradientColors.top,
    COLOR_PALETTE.darkTheme.gradientColors.bottom,
    COLOR_PALETTE.darkTheme.border,
    COLOR_PALETTE.darkTheme.text,
    COLOR_PALETTE.darkTheme.textNext,
    COLOR_PALETTE.darkTheme.background,
    COLOR_PALETTE.darkTheme.shadowColor,
  ] as const)
}


export const styles = StyleSheet.create({
  linearGradientUser: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
  },
  linearGradientMessage: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    gap: 10,
  },
  linearGradientMissed: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
  },
  black: {
    color: "#000000",
  },
  white: {
    color: "#FFFFFF",
  },
  red: {
    color: "#c90000"
  },
});

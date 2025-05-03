import React from 'react';
import { View, useColorScheme, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { COLOR_PALETTE } from "../../../shared/theme/colors";

interface GradientBorderWrapperProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    borderRadius?: number;
    borderWidth?: number;
}

export default function GradientBorder({
    children,
    style,
    borderRadius = 20,
    borderWidth = 2,
}: GradientBorderWrapperProps) {
    const colorScheme = useColorScheme();

    const gradientColors = colorScheme === 'light'
        ? ([
            COLOR_PALETTE.lightTheme.gradientColors.top,
            COLOR_PALETTE.lightTheme.gradientColors.bottom,
        ] as const)
        : ([
            COLOR_PALETTE.darkTheme.gradientColors.top,
            COLOR_PALETTE.darkTheme.gradientColors.bottom,
        ] as const)
    // ? ['#77B5BF', '#7D88AA']
    // : ['#3E4148', '#1B1E25'];

    return (
        <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                padding: borderWidth,
                borderRadius: borderRadius,
            }}
        >
            <View
                style={[
                    {
                        backgroundColor:
                            colorScheme === 'light'
                                ? COLOR_PALETTE.lightTheme.background
                                : COLOR_PALETTE.darkTheme.background,
                        borderRadius: borderRadius - borderWidth,
                    },
                    style,
                ]}
            >
                {children}
            </View>
        </LinearGradient>
    );
}

function Button({
    children,
    style,
    borderRadius = 20,
    borderWidth = 2,
}: GradientBorderWrapperProps) {
    const colorScheme = useColorScheme();

    const gradientColors = colorScheme === 'light'
        ? ([
            COLOR_PALETTE.lightTheme.gradientColors.top,
            COLOR_PALETTE.lightTheme.gradientColors.bottom,
        ] as const)
        : ([
            COLOR_PALETTE.darkTheme.gradientColors.top,
            COLOR_PALETTE.darkTheme.gradientColors.bottom,
        ] as const)

    return (
        <View className='flex-row , items-center, justify-center'>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    padding: borderWidth,
                    borderRadius: borderRadius,
                    alignSelf: 'flex-start',
                }}
            >
                <View
                    style={[
                        {
                            backgroundColor:
                                colorScheme === 'light'
                                    ? COLOR_PALETTE.lightTheme.background
                                    : COLOR_PALETTE.darkTheme.background,
                            borderRadius: borderRadius - borderWidth,
                        },
                        style,
                    ]}
                >
                    {children}
                </View>
            </LinearGradient>
        </View>
    );
}

GradientBorder.Button = Button


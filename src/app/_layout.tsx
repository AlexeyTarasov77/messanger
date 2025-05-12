import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { THEME_STORAGE_KEY } from "../shared/constants";
import "../styles/global.css";
import { Slot } from "expo-router";
import { UsersProvider } from "../modules/users/components/users-ctx/context";
import { RootLayout } from "../modules/main/screens/layouts/root-layout";

export default RootLayout

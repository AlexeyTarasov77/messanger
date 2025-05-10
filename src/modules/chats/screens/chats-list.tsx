import { Link, useRouter } from "expo-router"
import { TextInput, ScrollView, TouchableOpacity, Text, View, useColorScheme } from "react-native"
import { StyleSheet } from 'react-native';

import { ICONS } from "../../../shared/ui/icons";
// import { UserIcon, PenIcon } from "../../../shared/ui/icons"

import { LinearGradient } from "expo-linear-gradient";
import { verifyInstallation } from "nativewind";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { UserAvatar } from "../../../shared/ui/userAvatar";
import { COLOR_PALETTE} from "../../../shared/theme/colors";

export function ChatsListScreen() {
  verifyInstallation();
  const router = useRouter()
  const colorScheme = useColorScheme()

  const colors = colorScheme === "light"
    ? ([
      COLOR_PALETTE.lightTheme.gradientColors.top,
      COLOR_PALETTE.lightTheme.gradientColors.bottom,
    //   COLOR_PALETTE.lightTheme.border,
    //   COLOR_PALETTE.lightTheme.text,
    //   COLOR_PALETTE.lightTheme.background,
    //   COLOR_PALETTE.lightTheme.shadowColor,
    ] as const)
    : ([
      COLOR_PALETTE.darkTheme.gradientColors.top,
      COLOR_PALETTE.darkTheme.gradientColors.bottom,
    //   COLOR_PALETTE.darkTheme.border,
    //   COLOR_PALETTE.darkTheme.text,
    //   COLOR_PALETTE.darkTheme.textNext,
    //   COLOR_PALETTE.darkTheme.background,
    //   COLOR_PALETTE.darkTheme.shadowColor,
    ] as const)

  return (
      <ScrollView className="m-5 gap-5">

        <View className="flex-row items-center gap-5">
          {/* justify-center  */}
          {/* shadow-lg shadow-[#77B5BF] */}
          <View className="w-20 h-20">
            <LinearGradient
              colors={colors}
              style={[
                styles.linearGradientUser,
                {
                //   borderColor: colorScheme === 'light'
                    // ? COLOR_PALETTE.lightTheme.border
                    // : COLOR_PALETTE.darkTheme.border
                },
              ]}
            >
              <ICONS.UserIcon className="w-15 h-15" />

              {/* <UserIcon className="w-15 h-15" /> */}
            </LinearGradient>
          </View>
          {/* текст Inter */}
          <Text className="text-textColor text-2xl">Chats</Text>
        </View>

        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          className="px-4 py-2 bg-transparent shadow-shadow dark:shadow-shadowDark dark:border-borderDark border border-colorsMain rounded-xl text-textColor shadow-md"
        />

        <TouchableOpacity onPress={() => router.navigate("/chats/1")} className="">
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            style={[
              styles.linearGradientMessage,
              {
                // borderColor: colorScheme === 'light'
                //   ? COLOR_PALETTE.lightTheme.border
                //   : COLOR_PALETTE.darkTheme.border
              },
            ]}
          >

            <View className="w-20 h-20">
              <LinearGradient
                colors={colors}
                // className=" p-2 shadow-lg shadow-shadow dark:shadow-shadowDark dark:border-borderDark border-border border"
                style={[
                  styles.linearGradientUser,
                  {
                    // borderColor: colorScheme === 'light'
                    //   ? COLOR_PALETTE.lightTheme.border
                    //   : COLOR_PALETTE.darkTheme.border
                  },
                ]}
              >

                <ICONS.UserIcon className="w-15 h-15" />

                {/* <UserIcon className="w-15 h-15" /> */}

              </LinearGradient>
            </View>

            <View className="">
              <Text className="text-textColor text-lg">Name</Text>
              <Text className="text-textColor">Comandir the bes...</Text>
            </View>
            <View>
              <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                style={[
                  styles.linearGradientMissed,
                  {
                    // borderColor: colorScheme === 'light'
                    //   ? COLOR_PALETTE.lightTheme.border
                    //   : COLOR_PALETTE.darkTheme.border
                  },
                ]}
              >
                <Text className="absolute text-textColor text-xs font-bold">99+</Text>
              </LinearGradient>
            </View>
            <Text className="text-textColor">20:26</Text>

          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate("/chats/1")} className="">

          <ICONS.PenIcon className="w-15 h-15" />

          {/* <PenIcon className="w-15 h-15" /> */}

        </TouchableOpacity>
        {/* Link может обертывать только компонент Text по дефолту или компонент принимающий проп onPress (какой то из подвидов кнопок) С УКАЗАНИЕМ asChild для Link*/}

        <Link href="/auth/registration"><Text>reg</Text></Link>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
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
});

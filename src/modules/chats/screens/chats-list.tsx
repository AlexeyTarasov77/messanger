import { Link, useRouter } from "expo-router"
import { Button, TextInput, ScrollView, TouchableOpacity, Text, View, useColorScheme } from "react-native"
// import { useColorScheme } from "nativewind";
import { UserIcon, PenIcon } from "../../../shared/ui/icons"
import { LinearGradient } from "expo-linear-gradient";
import { verifyInstallation } from "nativewind";
import { COLOR_PALETTE } from "../../../shared/theme/colors";

export function ChatsListScreen() {
  verifyInstallation();
  const router = useRouter()
  const colorScheme = useColorScheme()

  const colors = colorScheme === "light"
    ? ([
      COLOR_PALETTE.lightTheme.gradientColors.top,
      COLOR_PALETTE.lightTheme.gradientColors.bottom
    ] as const)
    : ([
      COLOR_PALETTE.darkTheme.gradientColors.top,
      COLOR_PALETTE.darkTheme.gradientColors.bottom
    ] as const)

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      // end={{ x: 1, y: 1 }}
      className="h-full"
    >
      <ScrollView className="m-5 ">

        <View className="flex-row items-center">

          {/* justify-center  */}
          {/* shadow-lg shadow-[#77B5BF] */}


          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            className="w-20 h-20 rounded-full p-2 shadow-lg shadow-shadow dark:shadow-shadowDark dark:border-borderDark border-border border"
          >
            <UserIcon className="w-15 h-15 rounded-full" />
          </LinearGradient>
          {/* текст Inter */}
          <Text className="text-textColor ">Chats</Text>

        </View>

        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          className="px-4 py-2 bg-transparent shadow-shadow dark:shadow-shadowDark dark:border-borderDark border border-colorsMain rounded-xl text-textColor shadow-md "
        />

        {/* Контейнер с грандиентом и тени под ним в правом нижнем части и розмытом */}
        <TouchableOpacity onPress={() => router.navigate("/chats/1")} className="p-4 rounded-2xl border-2 ">
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            className=""
          >
            {/* изображение пользователя в LinearGradient чтобы фото было как в обводке из грандиентного круга и тени под ним в правом нижнем части*/}
            <LinearGradient
              colors={colors}
              start={{ x: 0, y: 0 }}
              // end={{ x: 1, y: 1 }}
              className="p-4 "
            >
              <UserIcon className="w-1 h-1" />
            </LinearGradient>
            <View>
              <Text className="text-textColor text-lg">Name</Text>
              <Text className="text-textColor">Comandir the bes...</Text>
            </View>
            <Text className="text-textColor">20:26</Text>

            {/* Сколько не прочитаных сообщений, градиент и бордер цвет у бордера градиент и тень светлая голубая 77B5BF с верху с лева */}
            <LinearGradient
              colors={colors}
              start={{ x: 0, y: 0 }}
              className=" top-2 left-2 rounded-full border-2  px-2 py-1 dark:border-[#666666] border-[#77B5BF] shadow-md shadow-[#77B5BF]"
            >
              <Text className="absolute text-textColor text-xs font-bold">99+</Text>
            </LinearGradient>

          </LinearGradient>
        </TouchableOpacity>

        {/* Сколько не прочитаных сообщений, нет градиент и бордер цвет у бордера градиент и тень светлая голубая 77B5BF с верху с лева */}
        <TouchableOpacity onPress={() => router.navigate("/chats/1")} >
          <PenIcon className="w-1 h-1" />
        </TouchableOpacity>
      </ScrollView>

      {/* <Text className="text-red-500 text-2xl">Chats screen</Text> */}
      {/* <Button onPress={() => router.navigate("/chats/1")} title="Go to chat" /> */}
      {/* Link может обертывать только компонент Text по дефолту или компонент принимающий проп onPress (какой то из подвидов кнопок) С УКАЗАНИЕМ asChild для Link*/}
      {/* <Link href="/chats/2"><Text>Go to another chat</Text></Link> */}

    </LinearGradient>
  )
}

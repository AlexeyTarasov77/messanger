import { Link, useRouter } from "expo-router"
import { Button, TextInput, TouchableOpacity, Text, View, useColorScheme } from "react-native"
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
      className="flex-1 h-full"
    >
      {/* <View></View> */}
      {/* View в вполную ширену в котором изображение пользователя и текста */}
      <View className="flex-row items-start m-4">
        {/* изображение пользователя в LinearGradient чтобы фото было как в обводке из грандиентного круга и тени под ним в правом нижнем части*/}
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 1 }}
          className="w-36 h-36 rounded-full items-center justify-center shadow-lg shadow-[#77B5BF]"
        >
          <UserIcon className="w-1 h-1" />
        </LinearGradient>
        {/* текст Inter */}
        <Text>Chats</Text>
      </View>

      {/* инпут прозрачным фоном и бордер цветом в ингридиенте и тень в инпут  */}
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        className="px-4 py-2 bg-transparent border dark:border-[#666666] border-[#77B5BF] rounded-xl text-white shadow-md shadow-[#77B5BF]/40"
      />

      {/* Контейнер с грандиентом и тени под ним в правом нижнем части и розмытом */}
      <TouchableOpacity onPress={() => router.navigate("/chats/1")} >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 1 }}
           className="p-4 rounded-2xl shadow-lg shadow-[#77B5BF]/30"
        >
          {/* изображение пользователя в LinearGradient чтобы фото было как в обводке из грандиентного круга и тени под ним в правом нижнем части*/}
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
           className="p-4 rounded-2xl shadow-lg shadow-[#77B5BF]/30"
          >
            <UserIcon className="w-1 h-1" />
          </LinearGradient>
          <View>
            {/* текст побольше */}
            <Text>Name</Text>
            <Text>Comandir the bes...</Text>
          </View>
          <Text>20:26</Text>

          {/* Сколько не прочитаных сообщений, градиент и бордер цвет у бордера градиент и тень светлая голубая 77B5BF с верху с лева */}
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
             className="absolute top-2 left-2 rounded-full px-2 py-1 border dark:border-[#666666] border-[#77B5BF] shadow-md shadow-[#77B5BF]"
          >
            <Text  className="text-white text-xs font-bold">99+</Text>
          </LinearGradient>

        </LinearGradient>
      </TouchableOpacity>

      {/* Сколько не прочитаных сообщений, нет градиент и бордер цвет у бордера градиент и тень светлая голубая 77B5BF с верху с лева */}
      <TouchableOpacity onPress={() => router.navigate("/chats/1")} >
        <PenIcon className="w-1 h-1" />
      </TouchableOpacity>

      {/* <Text className="text-red-500 text-2xl">Chats screen</Text> */}
      {/* <Button onPress={() => router.navigate("/chats/1")} title="Go to chat" /> */}
      {/* Link может обертывать только компонент Text по дефолту или компонент принимающий проп onPress (какой то из подвидов кнопок) С УКАЗАНИЕМ asChild для Link*/}
      {/* <Link href="/chats/2"><Text>Go to another chat</Text></Link> */}

    </LinearGradient>
  )
}

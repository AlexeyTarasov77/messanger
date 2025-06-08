import { View, Text } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input/input";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ILoginForm } from "../../types";
import { useUserCtx } from "../../components/users-ctx/context";
import { renderError } from "../../../../shared/utils/errors";

export function Login() {
  const router = useRouter();
  const { login } = useUserCtx();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: { email: "", password: "" },
  });
  async function onSubmit(data: ILoginForm) {
    const errMsg = await login(data);
    if (errMsg) {
      setError("root", { message: errMsg });
      return;
    }
    router.replace("/");
  }
  return (
    <View className="h-full pt-10 bg-mainBg">
      <View className=" self-center bg-white rounded-2xl px-4 py-12">
        <View className="flex-row gap-4 justify-center">
          <View>
            <Link href="/users/register-step-one" asChild>
              <Text className="font-bold text-2xl color-grey">Peєстрація</Text>
            </Link>
          </View>
          <View>
            <Text className="font-bold text-2xl color-darkBlue border-b">
              Авторизація
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-darkBlue font-medium text-2xl self-center pt-8 pb-4">
            Раді тебе знову бачити!
          </Text>
        </View>
        <View className="self-center gap-10 w-[80%]">
          <Controller
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="you@example.com"
                  onChange={field.onChange}
                  onChangeText={field.onChange}
                  value={field.value}
                  label="Електронна пошта"
                  autoCorrect={false}
                  autoCapitalize="none"
                  err={fieldState.error}
                  className="h-[42] w-full"
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input.Password
                  placeholder="Введи пароль"
                  onChange={field.onChange}
                  onChangeText={field.onChange}
                  value={field.value}
                  label="Пароль"
                  autoCorrect={false}
                  err={fieldState.error}
                  className="h-[42] flex-1"
                />
              );
            }}
          />
          {renderError(errors.root)}
          <View>
            <Button
              label="Увійти"
              onPress={handleSubmit(onSubmit)}
              className="h-[52] w-full self-center bg-slive border-border rounded-[1234] justify-center"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

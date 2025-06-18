import { Link, useRouter } from "expo-router";
import { ScrollView, Text, View, Button } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { verifyInstallation } from "nativewind";
import { Input } from "../../../shared/ui/input";
import { UserAvatar } from "../../users/components/avatar";
import { Controller, useForm } from "react-hook-form";
import { ChatListCard } from "../components/chat-card";
import { IChatListSearch, IUser } from "../types";
// import { getUserDisplayName } from "../../../users/utils";

export function ContactsScreen() {
    verifyInstallation();
    const router = useRouter();
    const {
        handleSubmit,
        control,
        getValues,
        setError,
        formState: { errors },
    } = useForm<IChatListSearch>({
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
        },
    });
    async function onSubmit(data: IChatListSearch) {
        router.push({
            pathname: "/users/settings",
            params: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
            },
        });
    }
    return (
        <View className="bg-mainBg h-full">
            <ScrollView className="bg-white border border-gray-400 rounded-xl mt-3 mb-3">
                <View className="flex-row items-center m-5 gap-5">
                    <View className="w-full gap-5">
                        <View className="flex-row items-center gap-2">
                            <ICONS.ContactsIcon
                                width={20}
                                height={20}
                            />
                            <Text className="color-grey dark:text-bgLight font-medium text-xl ">
                                Контакти
                            </Text>
                        </View>
                        <Controller
                            control={control}
                            name="lastName"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Search is required",
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input.InputSearch
                                        placeholder="Пошук"
                                        autoCapitalize="none"
                                        onChange={field.onChange}
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        label=""
                                        autoCorrect={false}
                                        err={fieldState.error}
                                        className="h-[42] "
                                    />
                                );
                            }}
                        />

                        <ChatListCard
                            username="Cameron_Williamson_21"
                            firstName="Cameron"
                            lastName="Williamson"
                            avatarUrl=""
                        />

                        <ChatListCard
                            username="Lesl_Alexander98"
                            firstName="Leslie"
                            lastName="Alexander"
                            avatarUrl="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhMVFRUXFRUWFRcVFRUVFRUYFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGBAQGi0dHx0tLS0tLS0tLS0tKy0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAIFAAEGBwj/xAA7EAABAwMBBQYFAwMEAQUAAAABAAIDBBEhMQUSQVFhBiJxgZHwEzKhscFC0eEUUvEHI2KSshczQ3KC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEBAQEBAAMAAgIDAQAAAAAAAAECEQMhMRJBBFETInEy/9oADAMBAAIRAxEAPwD0OWVDilyq+SqUI6nKanSQSp2ORc7DVJyKsQF816n8QKmbWKf9WgLR0yC+oVa+qS76lPhLOSqSslUkXSkqN1XCMPqChGQoaxMNkrLrSwBAbWkzHRPObWHM4+6l8CIGzpQTyaLn+FN1IczaUWk2+spWagutrc/sq5/bGFptHE0dTlT+c/R/hTbIHO0aT5IzdnynO4UrH2vjdhzy3wGPyffopJ2xpWOJM0sh8mt9MqNeXn1U8Vqyko5G6tPogFZ/6g0bQAN93116lZL2wopPma6/280T+Rn+z/w7/pq6y6ym29RuNt0gcyVajZ8covE/PI+8Ks+bOvidePWfqpWkappnxmzhbrwPgUBaoYVEqSiUBEqBUyolADKg4IhUHBBAuCE4I7kJyAFZYtlYmao/r1OOsVCydMQTKFOlhqkyyqK5+OpTMNRdMnQR1JR2zlVMMiaY9BLD4i1vpUSLRlQDjXqYKQbMmI5EAwE3Q0DpDyHP+EvSN3nAbwbnU6K92nN8Nm4CGi3eceA6ZyVOtcPM6Uj2fGHWMgcbX3W620N84SO1NsQU4IBF/Vy5fbPaKzTFB3W6F36ndSVy9nSO3nE249VHu/WnJHTSbXlqTdzzHEOIw59uAW5tssYC2Nthx5+Z4qmc6wxogjKPxkPtolXWuf08EozCOWKLWotEjN24I6YC5mse4bwAyPouqaqbbbdx4kI7ru67kDwJ98FzeadnXR4rykIiXWN+HvKci6k+un7+aUihOQPHpn39Vm84arnnx0X6s/6ot4/gqw2V2plhcCJHY4XuFyn9QdEJ82qOB7ns3ttSVMe7O5sbsZPy36HgU3Lsx1t6MiRh0LCDjy/C+dTWkE5XR9me2NRTObuuu0HLTbztyXTjzaz99ubf8fN+enrL2kGxFjyOqgSnabacVfAJYrfEGXNxvHn4quc5dedzU7HHrNzeVJxUC5CfIhGZURm6g8oPxlCSVASe9Cc9AkmS0lSgcNGRYqs1axHVccrFMmI5VVxOTsKlVPtlT9G9VMZyrGmdZOJX0D02x6qoZE3FImk9voMsnUKJfhIVkqAdbIRkjHA6jwBGE/TyLnoHllnO32h2AQ0Oa7/9bwB8Mrodl0rpSNyx5lunm02LT9Eunx0OwoxcvdYNaLknguX7VbeMziG4YMAfn7Kz7T7QEETaZhG8cyEfQHr/AAuLkdfKz/KWrzn0TdGXODU89obgaBRpWbveOpVfWVR3rKbvjSZ6dLrqFuiVjlOuqIKxqm6pyQ6xoUSxBbLyU2Pugxt26VraYSMcwjDhbwTDDZRlNlNOOV2c8/K75hdp53af8Lcz9SiVkbWzOJODZw8bW/CTqXrms5eOqe5KWccoNQ5SOoQJmoiqUPzXTcOEoDmyMxXpGY6DYO2paaQSRuLSPQ+PRehUPbClqcS/7Ep/UBeF55m2WFeSRvsERk6M6ufcG/Hnf17XUbPm3d9rfiMtfejO+LeWfoqKWssVU/6f9qHQP+G4Xa421trz4JrtXD8GctB7rhvjTQ+AC6fF5/zvL9cfl8P4e/0aFctmrXONqUUVK6GK1mqUjNUpSSpSUs6QOGpWKs+KsQoCFORuSURRmvSB1j01FKqtsiPHKmni8imTsEyoYp0zFUJ9Li+M2FW10qC6pSVTPdMh6baD47kPcAcFuC13RzXAggY1BXe9ndtNio3zfC+G8ndYN4lrr/qa1xwB0x4LzKjsZGg3sXAY8V0W29sx/wBQIg4ANtGG8Biy5/LefG/jz36lUzFxLnZJJNygk4spOkCT+LlYZtb2RY27pPsKnlpQXXOLH/KfZVCxz7C5zae3WsuOP0S90fFq55AwB7HJaEl8EBcBUbdme8AOsPEhWNFtiduo3hbQu+2cLTmoj8s13EUWLtKI1t1QbD7QxyndvuuyLErpRHx5pXV/ZzM/SPw/eUCZhsn2sQ5I7KfyVxy1b84uNPf5SUkat9rNAI8Um6K/vxusdX/Zvmf6q1sfH37ylZGqxlGlklUNsiVSr3e9dMtaoPYiRtVWlmcS3UrI+xsrBzLBVlSLuCM+xvsOxTuAFtV1dNXOqoO/czQAa/rhvb/s1xb4h3RctRU5JA+q7OgoRTxPmkeAXxvbGz9T94bu8eQyUsa5ucLy5lxeqkSKQlS4KwuXpPMEfKgPetOchkoNLeWKCxBsY5TD0u0ojSpBhrlMFCYigIOjMejtkSd1IPTScMyXklQy9DLkyMU0oa5rjkAgkeBVftnZpFYXNcST8KVoN72kJJPWxFieoTAKuIaZkrIpnW3ot5t8afp/8rLLyT5Wvjv6FfJutFzcoMbyUrVVG848giROws+cjTva1V1G4CBc3z75/wAritrtcHknN119Ra4KUq6EOtj+Le/opzT1PTiPhO4BWFHs6aSwubfa+NV0kGzR/bx8fFXmz9mgfb6aq7tGfFFRsfs01pabXtz0Oi7WKns37LUFMGjRONGFjff1r8+FWhbeOF0cxoc7Rb9lHOH3rlNrmzxi54IEDrjX3dH2xcOSUD7nkL+qy19dOf8AyHWHvdAq+YqxnF0lUN0Tg4XLc26IjYbaKZCI0JWrkDIwkI4rvVg+/wCyPQ0L3uDWtJc6waOd/wAI/Lg4e2BQiR5c82hiG888yNGjqVvau0HTP3jgaADAAGmF0O2dhiGiaIzf4brzf8y7G8Og08FyK7v4/jknf28/+R5Py1z9N3WiVpauuhzMKiVu60UG0sWLEjLtKMwpZpRWFIG2lFBSzHIgckYhKgXLCVAlUmpFyhvLRK6jZvZ6KJjaivfuMI3mQj/3Xt4Of/Yw+p6IupBJb8UNLTufoMDVx+UeJ/CcmnDWhgPdGc8SdT9vRA292mbK7dhZ8OJvdY1uGtB1sOZJJJ1N1XwO3/eii6lXM00590xTuOiFHHZNR6LLVaSNSC6JTt5qKNDH09+7LKXla89CQx398se/ZVtRR8fxbjxCQibxPljzt9VYwn+FWihsG9vsmWtQYGdE4xqUibUHNSc7cKxLFWVptwS0MuU22DvD6qvYbEW81Z9oCAAeq50VXev9FhZ7dmfh2pNrnglviA+/fsrZluOfNCYM2SUNGzH28ltw6rXxQAi0lK6VwsPD9ylVJ0lM57sZPAc/FdzsSl+C0mwMjhYu/tH9reSDsuhbE2wy7iefTwVhGFpjx/uufy+XvqG4AHBzHAEOaQQeIXnG1qIwyujPA4PNpy0jyXoUb7G6qu1uzBLF8Vg/3IvmAt3o9eHFt/S668a5f+uPeexw11olautErpYsusuokrV0gmsWliSibSisQGozEgYYiBQjRmhBtEo9HSfENviMYOLpN4Nb4kNPLTihFqnVU5J3eDcAfc+JU61MxWPHd101NtXZVCN5hNXOBh7mWY05+RjsD/7HePguM7S9qH1Ty9zTk3y7ePmUGaj4AgnlcXHkk309tVl+Ut62visnpGlkac2ueSfp25wCOefpZUvyPAHIE9L5t6WXR7O4e/qjf9ox/VPUjy4D7poRHgiwRtH5TrIlna0kIRMKfpmKT6cJqnjsoX+k202q38MhNxoohF9FpGVqFM8p9hQY4UZosq4gQpSrhumrrTlFXHHdqaO8RsMgg/uuCLl6/VQg6jC862/sUwyEgEsOQRwvwuse+3Ti9nFfSS5sdEYHl4JKIWVtsyjdI6w/x1U6axukoTI7pqTwC6ShYI/lGOfNThowwbo8zzTUMAtlTO9Tqw5BOCm2KqaLaJ6Ca+OK3xqX05t557hkFBkeW5CI0oNUrvxE+uV7S7Kay00VhG42c0f/ABu4gf8AE8Fz913jt3vNd8rsOH5XFV9I6GR0bxkH1HAjoQt/DvvqsvLjl7ACtXWFQJWzJO60o3WIMsEZhQipNUg3EU00pKMplpSUKiz1Heyf+Q6tOCPIpcuTE0QMImALtzejk/47zt9jr9cjy6qNzsaeLXK47ae+ycyZuHAjy4eGFYzbVD/ljdn+6wH01TE0jZG2IGLZzcgcEhO+2G/ZRzvPS5edsv0KKEufk5Juf4XR0jSBge76qloiOJGh8ccle0jflABsRjGnijRY/taMlIyRcW4apsSkZ4JKB7gCN0Hlm4KbjDjawA5rOtIcikvxTsYSFPT7p8TnmrVrQpg1RIhzTTSlWlGYVpGVMBy2hsKmVRMJWi5aQ3OWG7xpmJWCHPTsc3dcAQeBWby0ZAsutOObn7IxgkseQOVr2T1LRNhbut8zxKemmVfNOprWW1j38ExHe2UvSR3Nzom9fBEGg7LbdUXdUSnIi0zC5AnOqLGcXS8mi6v0wn0s5A2ns/8AqYu6LzR6c3s/t8eX8ornZWMkLXBzcEZUdsvY052crhn4QyV6FtTYcNawyxuEUo+YW7jiba20OvquQ2n2cqYD34yRa+8wFzPWy68+TOnJrx3KrusUSsWiESttCgpsUmYjCOEGMohckbZcrzs5Z7ix5JD2mINFt0B36iPEA36Fc85yfoKjdsAd39TiMkjUDpkN+mtzYvwT6qdo0hhkLTfBISFRDY/Y2XadqYRM1tSwfMXNdbg9pIPra65Vkpw2128uRtwPmoWnso5yAQPW6v4HEtHdsb6Xxrrceao4IW6tJtneH6uHHorykeSbAnu24YdcX1U2LlWMWvyi3O+b49U3FG8i1wDw3eV78UpDPvHFiBgjiM5R4piRY56mw+yiyr6sAN3PE6rI5iT0S2+T3v8ACI6W2n+VPOH9WF0QPVVHV3GPYRG7QHL/ACqlRcriN6K7RJ0T75R5X8k7Skac8AWS7p1GRhS74DxXPrrbPBn1CXfMT0UmwErbqcBR+LSakLOcLa/VQjhJTToxwHmgh59/dTZxUvRWs4BNRx2QqduEe6JEarHNwl3IrySegv5oMt1aYK04Q5CsichzLfPxnfpWV2VpjlqXRLudYINY0dT8N3HdOtvwugoNssbutLSYzgguuQet9QuRjmuFj0XPR129RsuBzi4QtIJuO60rFykO15GtDRw6n91inlP083BUgUEOUg5driNMcibyWY5FDkGkSoh9vQj1WiVAlMq6Ps7VNLHQyfI8uu7UscAC11uXz38Qq+voXU8hEmYpMtkbkHkWniElTT7ocObSB47pA+6utk7bfYxPDXx7jjuPFxvMBcN0/puMKNZ/as6/Svfsrdsc2Ojh5H8/dPQUbiO47fsb2yHdOhVnSbap2gt+AA2znObvuccAuFg7mBfp5LotmSUrh/s7rXcjg4xi+oWd60ljnqaJxIs3dNze+DkcOCaFFIHF1gW9OPidD/K6IxvGrQfEZstMc4atxyGLeCz/ADacUMcTwCbXB0sOfsFVu1a0Rd65NgLgZAPC4XZmka7Avfqqut7P7smW2uLEEZ6YU61xeZK4ObtKWi+7YcwNDr5i1j581WSbZmneGtBDsWt+o45et/4Xb7R7Ixu4EdW8/PxPqU1sDspFC7eAc53Autjwsqm8/wBe0XGu/fS12TA4RgHWw+2VZMpSlayZzRux4PP9gq9u1XA2fjqNP4Wd8kz6XPHde10+n6Jd8HNAbXkZB8joVZwyB7bj05FKamhc3JAsQ3N9PurCWJLvjVcT0lI290k1mSrN7UnKO8VluNMUWE2C20qERFiFl8qYqwVAlPmpkochVpRYhOde6IcIZAV59FQnhKSDCekCWlatWZOIozJENjcogaqkK1Ky2sssT4OvPQVNqE0orCtnMKxFCgxEQGloqaiVRIKcb7ehHqLKCxAFY8g36EeRbu/Yopld3LE/LbGf1OGnHGPJLqTnYHQEepJ/JSDr9ndsHsbuy98D/sL2NieJw73pf0/aqkc3ec4t7tyC25GbHTXOF5eDwWwVF8WaueSx3u0+2zbFlO0gOa4FzwQciwLN0gtI1vz6LmYauRjmu3nA4sCTe4xvv5AA3t+Na5lS8DdD3gcg5wHpey3fdb1P0B1PiftfmqmJIV1a63Z3bVxeGyMaWkgX0Iv525LumkOF26HTBB9DkLxNryDcfYH6Feof6cGWeNwc0gC5aSHAOuT8hJOMG+gWXkxJPS8btvtYzwKqrqO4K6GVtjZJzxri3h1Z25Vjiw7pvbgrvZE9iQUnW02b2WQv5LKdlb65qOjcgSBAp6rGVOSUcF0f5JY5riwBx5WSr2o8j78kIhRb1UnA2iwQS+yKX6299B75pGSTNvYUrns5vrQ6ocR0vr7yikrSJqEht4obRi/FbcbqBOLJht+iFIFORyHfh6LSVFhS2UYBDAz5o9lcqLGrLFOyxWTzIFEaVixbOYVr0QPWLEGmFvdWLE4TW6sAWLEBINWbqxYkbVlqyxYmTaxYsTIaGJrgbyBp4Ahxv5gGy9Y/0yjMNLI8vB3iCAQ42FrDXTN9AsWLHy/Gvj+rFz7knmhSBYsXNr43isrmXBVN8TdNuHuyxYuXX11eP4cikuisetLFKrBAFFx/lYsWkZVFwxZVtXHY396rFidGfqcMmEYO4LFioWIFyE4raxOFYi9yE9y0sWsRUGHN0wFixVE1JbWLFaX/2Q=="
                        />

                        {/* <View>
            <View className="flex-row items-center gap-2">
              <View className="border rounded-full p-2 ">
                <ICONS.UserIcon width={20} height={20} fill="#81818D" />
              </View>
              <View className="">
                <Text>Jane Cooper</Text>
              </View>
            </View>
          </View> */}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

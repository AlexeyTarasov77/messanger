import { View, Text } from "react-native";
import { IRegisterStepTwo } from "../types";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { Input } from "../../../shared/ui/input";
import { renderError } from "../../../shared/utils/errors";

const otpFieldNames: (keyof IRegisterStepTwo)[] = [
  "otp1",
  "otp2",
  "otp3",
  "otp4",
  "otp5",
  "otp6",
];

export const otpFieldsDefaults = Object.fromEntries(
  otpFieldNames.map((fieldName) => [fieldName, ""]),
);

export const collectFullCode = (data: IRegisterStepTwo): string => {
  return otpFieldNames.map((name) => data[name]).join("");
};

export function OTPInput({
  control,
  errors,
}: {
  control: Control<IRegisterStepTwo>;
  errors: FieldErrors<IRegisterStepTwo>;
}) {
  const getError = () => {
    let err: FieldError | undefined;
    otpFieldNames.forEach((name) => {
      if (errors[name]) {
        err = errors[name];
      }
    });
    return err;
  };
  const inputErr = getError();
  const otpInputs = otpFieldNames.map((fieldName, index) => (
    <View className="flex-row" key={index}>
      <Controller
        control={control}
        name={fieldName}
        rules={{
          required: {
            value: true,
            message: "Confirmation otp is required",
          },
          maxLength: 1,
        }}
        render={({ field }) => (
          <Input
            placeholder="___"
            onChange={field.onChange}
            onChangeText={field.onChange}
            value={field.value}
            maxLength={1}
            autoCapitalize="none"
            autoCorrect={false}
            className="h-[40] w-8 text-center border-grey rounded-2xl"
          />
        )}
      />
    </View>
  ));

  const otpInpusPairs = [];
  for (let i = 0; i < otpInputs.length; i += 2) {
    otpInpusPairs.push(
      <View className="flex-row gap-2" key={i}>
        {otpInputs.slice(i, i + 2)}
      </View>,
    );
  }
  console.log(otpInpusPairs)
  return (
    <View className="flex items-center">
      <Controller
        control={control}
        name="otp"
        rules={{
          required: {
            value: true,
            message: "Confirmation otp is required",
          },
          maxLength: 6,
        }}
        render={({ field, fieldState }) => (
          <Input
            placeholder="Введiть код з пошти"
            onChange={field.onChange}
            onChangeText={field.onChange}
            value={field.value}
            err={fieldState.error}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />
      {/* <View className="flex-row gap-4 pb-8">{otpInpusPairs}</View> */}
      {/* {renderError(inputErr)} */}
    </View>
  );
}

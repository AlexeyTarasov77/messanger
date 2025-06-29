import { View } from "react-native";
import { IRegisterStepTwo } from "../types";
import { Control, Controller, FieldError, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Input } from "../../../shared/ui/input";
import { renderError } from "../../../shared/utils/errors";
import * as Clipboard from 'expo-clipboard';

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
  setValue
}: {
  control: Control<IRegisterStepTwo>;
  errors: FieldErrors<IRegisterStepTwo>;
  setValue: UseFormSetValue<IRegisterStepTwo>
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
  const handleOnPaste = (content: string) => {
    for (let i = 0; i < content.length && i < otpFieldNames.length; i++) {
      setValue(otpFieldNames[i], content[i])
    }
  }
  const handleOnChangeText = async (content: string) => {
    if (content === '') return false;
    const copiedContent = await Clipboard.getStringAsync();
    if (copiedContent === '') return false;
    const isPasted = content.includes(copiedContent);
    if (isPasted) {
      handleOnPaste(content)
      return true
    };
    return false
  }
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
          <Input.InputOtp
            placeholder="___"
            onChange={field.onChange}
            onChangeText={async (val) => {
              const isPasted = await handleOnChangeText(val)
              !isPasted && val.length === 1 && field.onChange(val)
            }}
            value={field.value}
            // maxLength={1}
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
  return (
    <View className="flex items-center">
      {/* <Controller */}
      {/*   control={control} */}
      {/*   name="otp" */}
      {/*   rules={{ */}
      {/*     required: { */}
      {/*       value: true, */}
      {/*       message: "Confirmation otp is required", */}
      {/*     }, */}
      {/*     maxLength: 6, */}
      {/*   }} */}
      {/*   render={({ field, fieldState }) => ( */}
      {/*     <Input */}
      {/*       placeholder="Введiть код з пошти" */}
      {/*       onChange={field.onChange} */}
      {/*       onChangeText={field.onChange} */}
      {/*       value={field.value} */}
      {/*       err={fieldState.error} */}
      {/*       autoCapitalize="none" */}
      {/*       autoCorrect={false} */}
      {/*     /> */}
      {/*   )} */}
      {/* /> */}
      <View className="flex-row gap-4 pb-8">{otpInpusPairs}</View>
      {renderError(inputErr)}
    </View>
  );
}

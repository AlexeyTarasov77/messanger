import { Image, View } from "react-native";

export function UserSignature({ signatureUrl }: { signatureUrl: string }) {
  return (
    <View>
      <Image
        className="h-16 w-48"
        source={{
          uri: signatureUrl,
        }}
      />
    </View>
  );
}

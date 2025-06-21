import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImage = async (options: ImagePicker.ImagePickerOptions) => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permission.status !== "granted") {
    Alert.alert("Permission required to access media");
    return;
  }
  return await ImagePicker.launchImageLibraryAsync(options);
};

export const getImageData = (uri: string) => {
  const parts = uri.split(".");
  const ext = parts[parts.length - 1];
  return { uri, type: `image/${ext}`, name: `media_${+new Date()}.${ext}` };
};

export const buildImageUrl = (img: { file: string, filename: string }) => {
  if (img.file[-1] != "/") {
    img.file += "/"
  }
  return img.file + img.filename
}

import { IUserAvatar } from "./types";

export const getUserDisplayName = (user: {
  username?: string;
  email: string;
  first_name?: string;
  last_name?: string;
}) => {
  let finalName;
  if (user.first_name) {
    finalName = user.first_name;
    if (user.last_name) {
      finalName += " " + user.last_name;
    }
  }
  return finalName || user.username || user.email;
};

export const getUserAvatar = (user: { profile: { avatars: IUserAvatar[] } }): IUserAvatar | undefined => {
  return user.profile?.avatars.filter(avatar => avatar.active)[0]
}

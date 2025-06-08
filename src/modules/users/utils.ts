export const getUserDisplayName = (user: {
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
}) => {
  let finalName;
  if (user.firstName) {
    finalName = user.firstName;
    if (user.lastName) {
      finalName += " " + user.lastName;
    }
  }
  return finalName || user.username || user.email;
};

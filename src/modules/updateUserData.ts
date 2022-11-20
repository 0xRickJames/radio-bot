import { UserInt } from "../database/models/UserModel";

export const updateUserData = async (User: UserInt) => {
  User.day++;
  if (User.day > 10) {
    User.day = 1;
    User.round++;
  }
  User.timestamp = Date.now();
  await User.save();
  return User;
};
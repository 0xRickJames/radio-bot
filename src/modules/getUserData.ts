import UserModel, { UserInt } from "../database/models/UserModel";

export const getUserData = async (id: string): Promise<UserInt> => {
  const userData =
    (await UserModel.findOne({ discordId: id })) ||
    (await UserModel.create({
      discordId: id,
      round: 1,
      day: 0,
      date: Date.now(),
    }));
  return userData;
};
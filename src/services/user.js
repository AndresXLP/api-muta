import { User } from '../models/user';

export async function CreateUser({ userName, password }) {
  try {
    const newUser = await User.create({ userName, password });
    return newUser.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function GetUserByUserName(userName) {
  try {
    return await User.findOne({ where: { userName } });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default {
  CreateUser,
};

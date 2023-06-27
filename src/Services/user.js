import dayjs from 'dayjs';
import { User } from '../Models/user';

const path = 'Services/user';
export async function CreateUser({ userName, password }) {
  try {
    const newUser = await User.create({ userName, password });
    return newUser.id;
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/CreateUser()`);
    throw new Error(e);
  }
}

export async function GetUserByUserName(userName) {
  try {
    return await User.findOne({ where: { userName } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/GetUserByUserName()`);
    throw new Error(e);
  }
}

export default {
  CreateUser,
  GetUserByUserName,
};

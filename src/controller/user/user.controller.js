import { StatusCodes } from 'http-status-codes';
import { CreateUser, GetUserByUserName } from '../../services/user';
import { BindUserData, ComparePassword, generateJWT, getResponse } from '../../GlobalFunctions/GlobalFunctions';

export async function createUser(req, res) {
  try {
    const userData = BindUserData(req);
    if (userData.errors.length > 0)
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        errors: userData.errors,
      });

    const userExist = await GetUserByUserName(userData.userName);
    if (userExist)
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'This user name already in use, try with another.',
      });

    const newUser = await CreateUser(userData);
    return getResponse(res, {
      statusCode: StatusCodes.CREATED,
      msg: `user created successfully with ID: ${newUser}`,
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function login(req, res) {
  try {
    const userData = BindUserData(req);
    if (userData.errors.length > 0)
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        errors: userData.errors,
      });

    const userExist = await GetUserByUserName(userData.userName);
    if (!userExist)
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'User name or password are wrong, try again',
      });

    if (!(await ComparePassword(userData.password, userExist.password)))
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'User name or password are wrong, try again',
      });

    return getResponse(res, {
      statusCode: StatusCodes.OK,
      token: generateJWT({ userId: userExist.id, userName: userExist.userName }),
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default {
  createUser,
  login,
};

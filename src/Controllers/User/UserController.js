import { StatusCodes } from 'http-status-codes';
import { CreateUser, GetUserByUserName } from '../../Services/user';
import {
  BindUserData,
  ComparePassword,
  generateJWT,
  getResponse,
  getResponseError,
} from '../../GlobalFunctions/GlobalFunctions';

const path = 'Controllers/User/UserController';

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
    return getResponseError(res, e, `${path}/createUser()`);
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
    return getResponseError(res, e, `${path}/login()`);
  }
}

export default {
  createUser,
  login,
};

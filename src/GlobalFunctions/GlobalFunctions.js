import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function BindUserData(req, res) {
  const { user_name: userName, password } = req.body;
  if (!userName || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User and Password are required' });
  }
  return { userName, password };
}

export function MessageErrorAccount() {}

export function getResponse(res, dataResponse) {
  const { statusCode, data, token, msg, errors, err } = dataResponse;

  return res.status(statusCode).json({
    data,
    token,
    msg,
    errors,
    err,
  });
}

export default {
  BindUserData,
  MessageErrorAccount,
};

export async function ComparePassword(dbPassword, clientPassword) {
  const isMatch = await bcrypt.compare(dbPassword, clientPassword);
  return isMatch;
}

export function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const responseError = (res, err) =>
  res.status(StatusCodes.UNAUTHORIZED).json({
    err,
  });
class Authentication {
  async validateToken(req, res, next) {
    const token = Authentication.getToken(req);
    return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return responseError(res, 'Token not valid by err');
      if (decoded.data) {
        req.body.tokenID = decoded.data.userId;
        req.body.userName = decoded.data.userName;
        return next();
      }
      return responseError(res, 'Token not valid by data');
    });
  }

  static getToken(req) {
    return req ? req.headers['x-access-token'] || req.body.token || req.headers.authorization : null;
  }
}

module.exports = new Authentication();

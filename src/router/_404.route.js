import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { getResponse } from '../GlobalFunctions/GlobalFunctions';

const router = express.Router();

const notFound = (req, res) => {
  return getResponse(res, {
    statusCode: StatusCodes.NOT_FOUND,
    err: 'Not Found',
  });
};

router.route('/*').get(notFound).post(notFound).put(notFound).delete(notFound);

module.exports = router;

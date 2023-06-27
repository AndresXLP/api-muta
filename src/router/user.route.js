import express from 'express';
import { createUser, login } from '../controller/user/user.controller';

const router = express.Router();

router.route('/user').post(createUser);
router.route('/user/login').post(login);

module.exports = router;

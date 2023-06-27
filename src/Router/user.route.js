import express from 'express';
import { createUser, login } from '../Controllers/User/UserController';

const router = express.Router();

router.route('/user').post(createUser);
router.route('/user/login').post(login);

module.exports = router;

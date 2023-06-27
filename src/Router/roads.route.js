import express from 'express';
import Auth from '../Middleware/Authentication';
import { generateOptimumRoute } from '../Controllers/Road/RoadController';

const router = express.Router();

router.route('/road').post(Auth.validateToken, generateOptimumRoute);

module.exports = router;

import express from "express";
import Auth from "../Middleware/Authentication";
import {generateOptimumRoute} from "../Controllers/road/road.controller";

const router = express.Router();

router.route('/road').post(Auth.validateToken, generateOptimumRoute)

module.exports = router;

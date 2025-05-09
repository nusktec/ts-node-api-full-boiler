/**
 Author: Revelation.AF
 Git: nusktec
 **/
import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';
import {validateLoginRequest} from "../middlewares/validateRequest";

const router = express.Router();

// Login Route
router.post('/login', validateLoginRequest, login);

export default router;

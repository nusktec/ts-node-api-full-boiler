/**
 Author: Revelation.AF
 Git: nusktec
 **/
import express from 'express';
import { body } from 'express-validator';
import {index } from '../controllers/adminController';
import {validateLoginRequest} from "../middlewares/validateRequest";
import {roleCheckJWT} from "../middlewares/authMiddleware";

const router = express.Router();

// Login Route
router.post('/', validateLoginRequest, roleCheckJWT[1], index );

export default router;

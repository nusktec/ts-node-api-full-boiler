/**
 Author: Revelation.AF
 Git: nusktec
 **/
import express from 'express';
import { body } from 'express-validator';
import {index } from '../controllers/adminController';
import {validateLoginRequest} from "../middlewares/validateRequest";

const router = express.Router();

// Login Route
router.post('/', validateLoginRequest, index );

export default router;

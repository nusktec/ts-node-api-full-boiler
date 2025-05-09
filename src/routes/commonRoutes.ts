/**
 Author: Revelation.AF
 Git: nusktec
 **/
import express from 'express';
import { body } from 'express-validator';
import {index } from '../controllers/commonController';

const router = express.Router();

// Login Route
router.get('/', index );

export default router;
